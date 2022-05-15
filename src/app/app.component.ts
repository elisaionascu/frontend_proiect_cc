import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cloud Computing Project';
  file!: File;
  imageLinkValue: string;
  imageTextValue: string;
  imageLandmarkValue: string;
  contentData: any;
  landmarkContent: any;
  url: any;
  message = "";

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  options: google.maps.MapOptions = {
    center: { lat: 48.858461, lng: 2.294351 },
    zoom: 4
  }
  locations: Observable<Object>;

  ngOnInit() {

  }

  addMarker(latLng: any) {
    this.markerPositions.push(latLng);
  }

  constructor(public httpClient: HttpClient, public _dataService: DataService, public _locationService: LocationService, private snackBar: MatSnackBar) {
    this.imageLinkValue = "";
    this.imageTextValue = "";
    this.imageLandmarkValue = "";

    // get my location
    _locationService.getPosition().then(pos => {
      if (this.options.center) {
        this.options.center.lat = pos.lat;
        this.options.center.lng = pos.lng;
      }
      let latLng =
      {
        lat: pos.lat,
        lng: pos.lng
      }
      this.addMarker(latLng);
    });

    this.locations = httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Romania&key=AIzaSyBIInhunK4Ug0fW1bufWk8o5nzoiWZnQSg`).pipe(
      map((data) => {
        return data;
      }),
      catchError(val => {
        return of(val)
      }),
    );
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.message = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported!";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.message = "";
      this.url = reader.result;
    }
    this.file = event.target.files[0];
  }

  openSnackBarRequest(message: any) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['request-custom-class'];
    config.duration = 3000;
    this.snackBar.open(message, "close", config);
  }

  detectImageText() {
    if (this.imageLinkValue == "") {
      this.openSnackBarRequest('Missing image link!');
    } else {
      this._dataService.detectImageText(this.imageLinkValue).subscribe(data => {
        console.log(data);
        this.contentData = data;
        this.imageTextValue = this.contentData.textAnnotations;
        this.insertImageText(this.imageTextValue);
      })
    }
  }

  insertImageText(imageText: any) {
    if (imageText == "") {
      this.openSnackBarRequest('No text to insert!');
    } else {
      this._dataService.insertImageContent(imageText).subscribe(data => {
        console.log(data);
        this.contentData = data;
        this.openSnackBarRequest("Text inserted into table!");
      })
    }
  }

  detectImageLandmark() {
    console.log(this.file);
    if (this.file == undefined) {
      this.openSnackBarRequest('No image selected!');
    } else {
      this._dataService.detectImageLandmark(this.file.name).subscribe(data => {
        console.log(data);
        this.landmarkContent = data;
        this.imageLandmarkValue = "The landmark in the image is: " + this.landmarkContent.landmarkAnnotations;
      })
      this.getAnnotationLocation(this.landmarkContent);
    }
  }
 contentL:any;

  getAnnotationLocation(landmarkContent: any) {
    if (landmarkContent) {
    this.contentL = this.locations;
      this.contentL = null;
      this.contentL = this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${landmarkContent.landmarkAnnotations}&key=AIzaSyBIInhunK4Ug0fW1bufWk8o5nzoiWZnQSg`).pipe(
        map((data) => {
          return data;
        }),
        catchError(val => {
          return of(val)
        }),
      );
    }
  }

  addDynamicMarker() {
    this.contentL.subscribe((l: any) => {
      l.results.forEach((element: { geometry: { location: any; }; }) => {
        this.addMarker(element.geometry.location)
      });
    });
  }
}