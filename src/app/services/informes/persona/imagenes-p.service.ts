import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonImages } from 'app/models/informes/persona/imagenes-p';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesPService {
  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  addPersonImg(obj : PersonImages): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonImg',obj)
  }
  getPersonImgById(idPerson : number): Observable<Response<PersonImages>>{
    return this.http.get<Response<PersonImages>>(this.url + this.controllerPersona + '/getPersonImgById?idPerson='+idPerson)
  }
  uploadImages(formData : FormData) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerPersona + '/uploadImage',formData)
  }
  downloadImage(path : string){
    return this.http.get(this.url + this.controllerPersona + '/getImageByPath?path='+path,{observe:'response',responseType:'blob'});
  }
}
