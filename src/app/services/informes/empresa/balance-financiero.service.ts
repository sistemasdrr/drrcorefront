import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComboData } from 'app/models/combo';
import { Balance } from 'app/models/informes/empresa/balance';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceFinancieroService {
  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addOrUpdateBalance(obj : Balance): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/addOrUpdateBalance',obj)
  }
  getBalances(idCompany : number, balanceType : string): Observable<Response<ComboData[]>>{
    return this.http.get<Response<ComboData[]>>(this.url + this.controllerCompany + '/getListBalance?idCompany='+idCompany+'&balanceType='+balanceType)
  }
  getBalanceById(id : number): Observable<Response<Balance>>{
    return this.http.get<Response<Balance>>(this.url + this.controllerCompany + '/getBalanceById?id='+id)
  }
  deleteBalance(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteBalance?id='+id,'')
  }
}
