import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialP } from 'app/models/informes/persona/historial';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialPService {

  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getHistorial(idPerson : number): Observable<Response<HistorialP>>{
    return this.http.get<Response<HistorialP>>(this.url + this.controllerPersona + '/getPersonHistory?idPerson='+idPerson)
  }
  addHistorial(obj : HistorialP): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonHistory',obj)
  }
}
