import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SociosEmpresa, SociosEmpresaT } from 'app/models/informes/empresa/socios-empresa';
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
    return this.http.get<Response<SociosEmpresa>>(this.url + this.controllerCompany + '/getCompanyPartnerBy?id='+id)
  }
  getListCompanyPartner(idCompany : number): Observable<Response<SociosEmpresaT[]>>{
    return this.http.get<Response<SociosEmpresaT[]>>(this.url + this.controllerCompany + '/getListCompanyPartner?idCompany='+idCompany)
  }
  deleteCompanyPartner(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteCompanyPartnerBy?id='+id,'')
  }
}
