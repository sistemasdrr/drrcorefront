import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona, TPersona } from 'app/models/informes/persona/datos-generales';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesService {
  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getPersonaById(id : number): Observable<Response<Persona>>{
    return this.http.get<Response<Persona>>(this.url + this.controllerPersona + '/getPerson?id='+id)
  }
  getList(fullname : string, tipoFiltro : string, idCountry : number, haveReport : boolean): Observable<Response<TPersona[]>>{
    return this.http.get<Response<TPersona[]>>(this.url + this.controllerPersona + '/getListPerson?fullname='+fullname+'&form='+tipoFiltro+'&idCountry='+idCountry)
  }
  addPerson(obj : Persona): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPerson', obj)
  }
  deletePerson(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerPersona + '/deletePerson?id='+id, '')
  }
  activateWeb(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerPersona + '/deletePerson?id='+id, '')
  }
  desactivateWeb(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerPersona + '/deletePerson?id='+id, '')
  }
}
