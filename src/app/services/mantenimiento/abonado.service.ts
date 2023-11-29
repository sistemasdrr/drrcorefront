import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abonado, AbonadoT, PrecioAbonado, PrecioAbonadoT } from 'app/models/mantenimiento/abonado';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbonadoService {
  url = environment.apiUrl
  controllerCombo = "/Combo"
  controllerMaster = "/Master"
  controllerAbonado = "/"

  constructor(private http : HttpClient) { }

  getAbonados(code : string, name : string, state : string): Observable<Response<AbonadoT[]>>{
    return this.http.get<Response<AbonadoT[]>>(this.url + this.controllerAbonado + '/getAll?code='+code+'&name='+name+'&state='+state);
  }
  getAbonadoPorId(idAbonado : number): Observable<Response<Abonado>>{
    return this.http.get<Response<Abonado>>(this.url + this.controllerAbonado + '/getById?id='+idAbonado);
  }
  getPreciosPorIdAbonado(idAbonado : number): Observable<Response<PrecioAbonadoT[]>>{
    return this.http.get<Response<PrecioAbonadoT[]>>(this.url + this.controllerAbonado + '/getPreciosAbonadoById?id='+idAbonado);
  }
  getPrecioPorId(idPrecio : number): Observable<Response<PrecioAbonado>>{
    return this.http.get<Response<PrecioAbonado>>(this.url + this.controllerAbonado + '/getPrecioById?id='+idPrecio);
  }
  addPrecio(precio : PrecioAbonado): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerAbonado + '/addPrecio',precio);
  }
  addAbonado(abonado : Abonado): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerAbonado + '/addAbonado',abonado);
  }
  deleteAbonado(id : number): Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerAbonado + '/deleteAbonado?id='+id);
  }
  deletePrecio(idPrecio : number): Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerAbonado + '/deletePrecio?id='+idPrecio);
  }
}
