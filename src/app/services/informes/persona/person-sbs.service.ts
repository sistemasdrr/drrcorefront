import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeudaBancaria, DeudaBancariaT, MorosidadComercial, MorosidadComercialT, Proveedor, ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
import { PersonSBS } from 'app/models/informes/persona/sbs-riesgo';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonSbsService {
  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getPersonSBS(idPerson : number): Observable<Response<PersonSBS>>{
    return this.http.get<Response<PersonSBS>>(this.url + this.controllerPersona + '/getPersonsBS?idPerson='+idPerson)
  }
  addPersonSBS(obj : PersonSBS): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonSbs',obj)
  }
  addProvider(obj : Proveedor): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerPersona + '/addOrUpdateProvider',obj)
  }
  getProviderByIdPerson(idPerson : number): Observable<Response<ProveedorT[]>>{
    return this.http.get<Response<ProveedorT[]>>(this.url  + this.controllerPersona + '/getListProvider?idPerson='+idPerson)
  }
  getProviderById(id : number): Observable<Response<Proveedor>>{
    return this.http.get<Response<Proveedor>>(this.url + this.controllerPersona + '/getProviderById?id='+id)
  }
  deleteProvider(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerPersona + '/deleteProvider?id='+id,'')
  }
  addLatePayment(obj : MorosidadComercial): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerPersona + '/addOrUpdateLatePayment',obj)
  }
  getLatePaymentByIdPerson(idPerson : number): Observable<Response<MorosidadComercialT[]>>{
    return this.http.get<Response<MorosidadComercialT[]>>(this.url  + this.controllerPersona + '/getListLatePayment?idPerson='+idPerson)
  }
  getLatePaymentById(id : number): Observable<Response<MorosidadComercial>>{
    return this.http.get<Response<MorosidadComercial>>(this.url + this.controllerPersona + '/getLatePaymentById?id='+id)
  }
  deleteLatePayment(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerPersona + '/deleteLatePayment?id='+id,'')
  }
  addBankDebt(obj : DeudaBancaria): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerPersona + '/addOrUpdateBankDebt',obj)
  }
  getBankDebtByIdPerson(idPerson : number): Observable<Response<DeudaBancariaT[]>>{
    return this.http.get<Response<DeudaBancariaT[]>>(this.url  + this.controllerPersona + '/getListBankDebt?idPerson='+idPerson)
  }
  getBankDebtById(id : number): Observable<Response<DeudaBancaria>>{
    return this.http.get<Response<DeudaBancaria>>(this.url + this.controllerPersona + '/getBankDebtById?id='+id)
  }
  deleteBankDebt(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerPersona + '/deleteBankDebt?id='+id,'')
  }
}
