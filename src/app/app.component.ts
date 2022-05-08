import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cloud Computing Project';
  form!: FormGroup;
  file!: File;
  imageLinkValue: string;
  imageTextValue: string;
  imageLandmarkValue: string;
  contentData: any;

  constructor(private _dataService: DataService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.imageLinkValue = "";
    this.imageTextValue = "";
    this.imageLandmarkValue = "";
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      file_upload: null
    });
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  }

  upload() {

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
      })
    }
  }
  landmarkContent: any;

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
    }
  }
}
