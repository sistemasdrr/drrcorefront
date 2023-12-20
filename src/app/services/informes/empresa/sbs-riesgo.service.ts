import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avales, CompanySbs, DeudaBancaria, DeudaBancariaT, MorosidadComercial, MorosidadComercialT, Proveedor, ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SbsRiesgoService {
  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addCompanySbs(obj : CompanySbs): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addOrUpdateCompanySbs',obj)
  }
  getCompanySbsById(id : number): Observable<Response<CompanySbs>>{
    return this.http.get<Response<CompanySbs>>(this.url + this.controllerCompany + '/getCompanySbsById?id='+id)
  }
  addProvider(obj : Proveedor): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/addOrUpdateProvider',obj)
  }
  getProviderByIdCompany(idCompany : number): Observable<Response<ProveedorT[]>>{
    return this.http.get<Response<ProveedorT[]>>(this.url  + this.controllerCompany + '/getListProvider?idCompany='+idCompany)
  }
  getProviderById(id : number): Observable<Response<Proveedor>>{
    return this.http.get<Response<Proveedor>>(this.url + this.controllerCompany + '/getProviderById?id='+id)
  }
  deleteProvider(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/deleteProvider?id='+id,'')
  }
  addLatePayment(obj : MorosidadComercial): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/addOrUpdateLatePayment',obj)
  }
  getLatePaymentByIdCompany(idCompany : number): Observable<Response<MorosidadComercialT[]>>{
    return this.http.get<Response<MorosidadComercialT[]>>(this.url  + this.controllerCompany + '/getListLatePayment?idCompany='+idCompany)
  }
  getLatePaymentById(id : number): Observable<Response<MorosidadComercial>>{
    return this.http.get<Response<MorosidadComercial>>(this.url + this.controllerCompany + '/getLatePaymentById?id='+id)
  }
  deleteLatePayment(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/deleteLatePayment?id='+id,'')
  }
  addBankDebt(obj : DeudaBancaria): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/addOrUpdateBankDebt',obj)
  }
  getBankDebtByIdCompany(idCompany : number): Observable<Response<DeudaBancariaT[]>>{
    return this.http.get<Response<DeudaBancariaT[]>>(this.url  + this.controllerCompany + '/getListBankDebt?idCompany='+idCompany)
  }
  getBankDebtById(id : number): Observable<Response<DeudaBancaria>>{
    return this.http.get<Response<DeudaBancaria>>(this.url + this.controllerCompany + '/getBankDebtById?id='+id)
  }
  deleteBankDebt(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/deleteBankDebt?id='+id,'')
  }
  addEndorsements(obj : Avales): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/addOrUpdateEndorsement',obj)
  }
  getEndorsementByIdCompany(idCompany : number): Observable<Response<Avales[]>>{
    return this.http.get<Response<Avales[]>>(this.url  + this.controllerCompany + '/getListEndorsement?idCompany='+idCompany)
  }
  getEndorsementById(id : number): Observable<Response<Avales>>{
    return this.http.get<Response<Avales>>(this.url + this.controllerCompany + '/getEndorsementById?id='+id)
  }
  deleteEndorsement(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url  + this.controllerCompany + '/deleteEndorsement?id='+id,'')
  }

}
