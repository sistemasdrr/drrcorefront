import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agente, AgenteT, PrecioAgente, PrecioAgenteT } from 'app/models/mantenimiento/agente';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {
  url = environment.apiUrl
  controllerCombo = "/Combo"
  controllerMaster = "/Master"
  controllerAbonado = "/"
  controllerAgente = "/Agent"

  constructor(private http : HttpClient) { }

  getAgentes(code : string, name : string, state : string): Observable<Response<AgenteT[]>>{
    return this.http.get<Response<AgenteT[]>>(this.url + this.controllerAgente + '/Get?code='+code+'&name='+name+'&state='+state);
  }
  getAgentePorId(idAgente : number): Observable<Response<Agente>>{
    return this.http.get<Response<Agente>>(this.url+ this.controllerAgente + '/GetById?idAgent='+idAgente);
  }
  getPreciosPorIdAgente(idAgente : number): Observable<Response<PrecioAgenteT[]>>{
    return this.http.get<Response<PrecioAgenteT[]>>(this.url + this.controllerAgente + '/GetPricesById?idAgent='+idAgente);
  }
  getPrecioPorId(idPrecio : number): Observable<Response<PrecioAgente>>{
    return this.http.get<Response<PrecioAgente>>(this.url + this.controllerAgente + '/getPrecioById?id='+idPrecio);
  }
  addPrecio(precio : PrecioAgente): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerAgente + '/addPrecio',precio);
  }
  addAgente(agente : Agente): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerAgente + '/addOrUpdate',agente);
  }
  deleteAgente(id : number): Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerAgente + '/deleteAgente?id='+id);
  }
  deletePrecio(idPrecio : number): Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerAgente + '/deletePrecio?id='+idPrecio);
  }
}
