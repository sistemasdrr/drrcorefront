import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccionistasEmpresa, AccionistasEmpresaT, SociosEmpresa, SociosEmpresaT } from 'app/models/informes/empresa/socios-empresa';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SociosEmpresaService {
  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addCompanyPartner(obj : SociosEmpresa): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addCompanyPartner',obj)
  }
  getCompanyPartner(id : number): Observable<Response<SociosEmpresa>>{
    return this.http.get<Response<SociosEmpresa>>(this.url + this.controllerCompany + '/getCompanyPartner?id='+id)
  }
  getListCompanyPartner(idCompany : number): Observable<Response<SociosEmpresaT[]>>{
    return this.http.get<Response<SociosEmpresaT[]>>(this.url + this.controllerCompany + '/getListCompanyPartner?idCompany='+idCompany)
  }
  deleteCompanyPartner(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteCompanyPartner?id='+id,'')
  }
  addCompanyShareHolder(obj : AccionistasEmpresa): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addCompanyShareHolder',obj)
  }
  getCompanyPartnerShareHolder(id : number): Observable<Response<AccionistasEmpresa>>{
    return this.http.get<Response<AccionistasEmpresa>>(this.url + this.controllerCompany + '/getCompanyShareHolder?id='+id)
  }
  getListCompanyShareHolder(idCompany : number): Observable<Response<AccionistasEmpresaT[]>>{
    return this.http.get<Response<AccionistasEmpresaT[]>>(this.url + this.controllerCompany + '/getListCompanyShareHolder?idCompany='+idCompany)
  }
  deleteCompanyShareHolder(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteCompanyShareHolder?id='+id,'')
  }
}
