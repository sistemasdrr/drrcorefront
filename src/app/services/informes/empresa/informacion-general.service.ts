import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InformacionGeneral } from 'app/models/informes/empresa/informacion-general';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformacionGeneralService {
  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addGeneralInformation(obj : InformacionGeneral): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addOrUpdateGeneralInformation',obj)
  }
  getGeneralInformationByIdCompany(idCompany : number): Observable<Response<InformacionGeneral>>{
    return this.http.get<Response<InformacionGeneral>>(this.url + this.controllerCompany + '/getGeneralInformationByIdCompany?idCompany='+idCompany)
  }
  
}
