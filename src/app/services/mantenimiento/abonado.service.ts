import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComboData } from 'app/models/combo';
import { Abonado, AbonadoT, FacturacionPorCupones, HistorialFacturacionPorCupones, PrecioAbonado, PrecioAbonadoT } from 'app/models/mantenimiento/abonado';
import { Pais } from 'app/models/pais';
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
  controllerAbonado = "/Subscriber"

  constructor(private http : HttpClient) { }

  getAbonados(code : string, name : string, enable : string): Observable<Response<AbonadoT[]>>{
    return this.http.get<Response<AbonadoT[]>>(this.url + this.controllerAbonado + '/get?code='+code+'&name='+name+'&enable='+enable);
  }
  getAbonadoPorId(idAbonado : number): Observable<Response<Abonado>>{
    return this.http.get<Response<Abonado>>(this.url + this.controllerAbonado + '/getById?id='+idAbonado);
  }
  getAbonadoPorCode(code : string): Observable<Response<Abonado>>{
    return this.http.get<Response<Abonado>>(this.url + this.controllerAbonado + '/getByCode?code='+code);
  }
  getPreciosPorIdAbonado(idAbonado : number): Observable<Response<PrecioAbonadoT[]>>{
    return this.http.get<Response<PrecioAbonadoT[]>>(this.url +  this.controllerAbonado + '/getPrices?idSubscriber='+idAbonado);
  }
  getPrecioPorId(idPrecio : number): Observable<Response<PrecioAbonado>>{
    return this.http.get<Response<PrecioAbonado>>(this.url + this.controllerAbonado + '/getPrice?id='+idPrecio);
  }
  addPrecio(precio : PrecioAbonado): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerAbonado + '/addPrice',precio);
  }
  addAbonado(abonado : Abonado): Observable<Response<number>>{
    return this.http.post<Response<number>>('https://localhost:7234/api' + this.controllerAbonado + '/add',abonado);
  }
  deleteAbonado(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerAbonado + '/delete?id='+id,'');
  }
  activeAbonado(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerAbonado + '/active?id='+id,'');
  }
  deletePrecio(idPrecio : number): Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerAbonado + '/deletePrice?id='+idPrecio);
  }
  getContinentes(idAbonado : number): Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerAbonado + '/getContinents?id='+idAbonado);
  }
  getPaises(idAbonado : number, idContinent : number): Observable<Response<Pais[]>>{
    return this.http.get<Response<Pais[]>>(this.url + this.controllerAbonado + '/getCountries?idSubscriber='+idAbonado+'&idContinent='+idContinent);
  }
  getPreciosPorPais(idAbonado : number, idContinent : number, idPais : number): Observable<Response<Precio[]>>{
    return this.http.get<Response<Precio[]>>(this.url + this.controllerAbonado + '/getPriceByIds?idSubscriber='+idAbonado+'&idContinent='+idContinent+'&idCountry='+idPais);
  }
  getFacturacionPorCupones(idAbonado : number): Observable<Response<FacturacionPorCupones>>{
    return this.http.get<Response<FacturacionPorCupones>>('https://localhost:7234/api' + this.controllerAbonado + '/getCouponBilling?idSubscriber='+idAbonado);
  }
  addFacturacionPorCupones(obj : FacturacionPorCupones) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerAbonado + '/addCouponBilling',obj);
  }
  getHistorialFacturacionPorCupones(idAbonado : number): Observable<Response<HistorialFacturacionPorCupones[]>>{
    return this.http.get<Response<HistorialFacturacionPorCupones[]>>('https://localhost:7234/api' + this.controllerAbonado + '/getCouponBillingHistory?idSubscriber='+idAbonado);
  }
  addHistorialFacturacionPorCupones(obj : HistorialFacturacionPorCupones) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerAbonado + '/addCouponBillingHistory',obj);
  }
}
export interface Precio{
  name : string
  price : number
  days : number
}
