import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeudaBancaria, DeudaBancariaT, MorosidadComercial, MorosidadComercialT, Proveedor, ProveedorT } from 'app/models/informes/empresa/sbs-riesgo';
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

  addProvider(obj : Proveedor): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerCompany + '/addOrUpdateProvider',obj)
  }
  getProviderByIdCompany(idCompany : number): Observable<Response<ProveedorT[]>>{
    return this.http.get<Response<ProveedorT[]>>('https://localhost:7234/api' + this.controllerCompany + '/getListProvider?idCompany='+idCompany)
  }
  getProviderById(id : number): Observable<Response<Proveedor>>{
    return this.http.get<Response<Proveedor>>('https://localhost:7234/api'+ this.controllerCompany + '/getProviderById?id='+id)
  }
  deleteProvider(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerCompany + '/deleteProvider?id='+id,'')
  }
  addLatePayment(obj : MorosidadComercial): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerCompany + '/addOrUpdateLatePayment',obj)
  }
  getLatePaymentByIdCompany(idCompany : number): Observable<Response<MorosidadComercialT[]>>{
    return this.http.get<Response<MorosidadComercialT[]>>('https://localhost:7234/api' + this.controllerCompany + '/getListLatePayment?idCompany='+idCompany)
  }
  getLatePaymentById(id : number): Observable<Response<MorosidadComercial>>{
    return this.http.get<Response<MorosidadComercial>>('https://localhost:7234/api'+ this.controllerCompany + '/getLatePaymentById?id='+id)
  }
  deleteLatePayment(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerCompany + '/deleteLatePayment?id='+id,'')
  }
  addBankDebt(obj : DeudaBancaria): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerCompany + '/addOrUpdateBankDebt',obj)
  }
  getBankDebtByIdCompany(idCompany : number): Observable<Response<DeudaBancariaT[]>>{
    return this.http.get<Response<DeudaBancariaT[]>>('https://localhost:7234/api' + this.controllerCompany + '/getListBankDebt?idCompany='+idCompany)
  }
  getBankDebtById(id : number): Observable<Response<DeudaBancaria>>{
    return this.http.get<Response<DeudaBancaria>>('https://localhost:7234/api'+ this.controllerCompany + '/getBankDebtById?id='+id)
  }
  deleteBankDebt(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api' + this.controllerCompany + '/deleteBankDebt?id='+id,'')
  }

}
