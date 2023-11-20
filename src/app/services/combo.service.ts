import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComboData, PoliticaPagos, Reputacion, RiesgoCrediticio } from 'app/models/combo';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  url = environment.apiUrl
  controllerCombo = "/Combo"

  constructor(private http : HttpClient) { }

  getTipoDocumento() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/doctype');
  }
  getTipoMoneda() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/currency');
  }
  getEstadoCivil() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/civilstatus');
  }
  getDepartamento() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/jobdep');
  }
  getCargoPorDepartamento(id : number) : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/jobbydep?department='+id);
  }
  getTipoCuenta() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/bankaccounttype');
  }
  getVinculoFamiliar() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/fambondytype');
  }
  getPersoneriaJuridica() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/legalpersontype');
  }
  getRiesgoCrediticio() : Observable<Response<RiesgoCrediticio[]>>{
    return this.http.get<Response<RiesgoCrediticio[]>>(this.url + this.controllerCombo + '/creditrisk');
  }
  getReputacion() : Observable<Response<Reputacion[]>>{
    return this.http.get<Response<Reputacion[]>>(this.url + this.controllerCombo + '/companyreputation');
  }
  getPoliticaPagos() : Observable<Response<PoliticaPagos[]>>{
    return this.http.get<Response<PoliticaPagos[]>>(this.url + this.controllerCombo + '/paymentpolicy');
  }
  getSituacionRUC() : Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCombo + '/legalregister');
  }
}
