import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialInformation, HistoricoVentas, HistoricoVentasT } from 'app/models/informes/empresa/situacion-financiera';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  getFinanzasById(id : number): Observable<Response<FinancialInformation>>{
    return this.http.get<Response<FinancialInformation>>(this.url + this.controllerCompany + '/getFinancialById?id='+id)
  }
  getFinanzasByIdCompany(idCompany : number): Observable<Response<FinancialInformation>>{
    return this.http.get<Response<FinancialInformation>>(this.url + this.controllerCompany + '/getFinancialByIdCompany?idCompany='+idCompany)
  }
  addOrUpdateFinanzas(obj : FinancialInformation) : Observable<Response<number>>{
    return this.http.post<Response<number>>('https://localhost:7234/api/Company/addFinancial', obj)
  }
  addOrUpdateHistoricoVentas(obj : HistoricoVentas) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>('https://localhost:7234/api/Company/addOrUpdateSaleHistory', obj)
  }
  getListHistoricoVentas(idCompany : number) : Observable<Response<HistoricoVentasT[]>>{
    return this.http.get<Response<HistoricoVentasT[]>>('https://localhost:7234/api/Company/getListSaleHistoryByIdCompany?idCompany='+idCompany)
  }
  getHistoricoVenta(id : number) : Observable<Response<HistoricoVentas>>{
    return this.http.get<Response<HistoricoVentas>>('https://localhost:7234/api/Company/getSaleHistoryById?id='+id)
  }
}
