import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SociosEmpresa, SociosPersonaT } from 'app/models/informes/empresa/socios-empresa';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocioPersonaService {

  url = environment.apiUrl
  controllerPerson = "/Person"
  constructor(private http : HttpClient) { }

  addPersonPartner(obj : SociosEmpresa): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerPerson + '/addPersonPartner',obj)
  }
  getPersonPartner(id : number): Observable<Response<SociosEmpresa>>{
    return this.http.get<Response<SociosEmpresa>>(this.url + this.controllerPerson + '/getPersonPartner?id='+id)
  }
  getListPersonPartner(idPerson : number): Observable<Response<SociosPersonaT[]>>{
    return this.http.get<Response<SociosPersonaT[]>>(this.url + this.controllerPerson + '/getListPersonPartner?idPerson='+idPerson)
  }
  deletePersonPartner(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerPerson + '/deletePersonPartner?id='+id,'')
  }
}
