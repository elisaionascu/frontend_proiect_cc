import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  apiUrl="http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  detectImageText(imageLink:any): Observable<HttpResponse<any>> {
    let url = this.apiUrl.concat("/detection/text?link=");
    if(imageLink!=undefined) {
      url+=imageLink;
    }
    return this.httpClient.get<any>(url);
  }

  detectImageLandmark(fileName:any): Observable<HttpResponse<any>> {
    let url = this.apiUrl.concat("/detection/landmark?image=");
    if(fileName!=undefined) {
      url+=fileName;
    }
    return this.httpClient.get<any>(url);
  }

  insertImageContent(imageText: string): Observable<HttpResponse<any>> {
    let url = this.apiUrl.concat("/detection/insertText");
    const payload = {
      imageText: imageText
    }
    return this.httpClient.post<any>(url, payload);
  }

}
