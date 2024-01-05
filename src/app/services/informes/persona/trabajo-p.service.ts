import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrabajoA, TrabajoG } from 'app/models/informes/persona/trabajo';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajoPService {

  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getTrabajo(idPerson : number): Observable<Response<TrabajoG>>{
    return this.http.get<Response<TrabajoG>>(this.url + this.controllerPersona + '/getPersonJob?idPerson='+idPerson)
  }
  addTrabajo(obj : TrabajoA): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonJob',obj)
  }
}
