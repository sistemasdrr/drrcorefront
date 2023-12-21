import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyImages } from 'app/models/informes/empresa/imagenes';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addCompanyImg(obj : CompanyImages): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addOrUpdateCompanyImg',obj)
  }
  getCompanyImgByIdCompany(idCompany : number): Observable<Response<CompanyImages>>{
    return this.http.get<Response<CompanyImages>>(this.url + this.controllerCompany + '/getCompanyImgByIdCompany?idCompany='+idCompany)
  }
  uploadImages(formData : FormData) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/uploadImage',formData)
  }
  downloadImage(path : string){
    return this.http.get(this.url + this.controllerCompany + '/getImageByPath?path='+path,{observe:'response',responseType:'blob'});
  }
}
