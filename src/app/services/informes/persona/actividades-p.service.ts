import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActividadesP } from 'app/models/informes/persona/actividades';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadesPService {

  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getActividad(idPerson : number): Observable<Response<ActividadesP>>{
    return this.http.get<Response<ActividadesP>>(this.url + this.controllerPersona + '/getPersonActivity?idPerson='+idPerson)
  }
  addActividad(obj : ActividadesP): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonActivity',obj)
  }
}
