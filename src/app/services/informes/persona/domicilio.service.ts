import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Domicilio } from 'app/models/informes/persona/domicilio';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {
  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getDomicilio(idPerson : number): Observable<Response<Domicilio>>{
    return this.http.get<Response<Domicilio>>(this.url + this.controllerPersona + '/getPersonHome?idPerson='+idPerson)
  }
  addDomicilio(obj : Domicilio): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonHome',obj)
  }

}
