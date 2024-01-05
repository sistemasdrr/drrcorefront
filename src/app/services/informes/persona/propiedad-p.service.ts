import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropiedadP } from 'app/models/informes/persona/propiedad';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropiedadPService {

  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getPropiedad(idPerson : number): Observable<Response<PropiedadP>>{
    return this.http.get<Response<PropiedadP>>(this.url + this.controllerPersona + '/getPersonProperty?idPerson='+idPerson)
  }
  addPropiedad(obj : PropiedadP): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonProperty',obj)
  }
}
