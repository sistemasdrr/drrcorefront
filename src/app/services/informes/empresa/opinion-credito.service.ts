import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpinionCredito } from 'app/models/informes/empresa/opinion-credito';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionCreditoService {
  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addCreditOpinion(obj : OpinionCredito): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addOrUpdateCreditOpinion',obj)
  }
  getCreditOpinionByIdCompany(idCompany : number): Observable<Response<OpinionCredito>>{
    return this.http.get<Response<OpinionCredito>>(this.url + this.controllerCompany + '/getCreditOpinionByIdCompany?idCompany='+idCompany)
  }
}
