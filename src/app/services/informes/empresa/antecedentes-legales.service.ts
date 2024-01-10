import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Background, CompanyRelation, CompanyRelationT } from 'app/models/informes/empresa/antecendentes-legales';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesLegalesService {

  url = environment.apiUrl
  controllerCompany = "/Company"

  constructor(private http : HttpClient) {}

  getAntecedentesLegalesPorId(idCompany : number): Observable<Response<Background>>{
    return this.http.get<Response<Background>>(this.url + this.controllerCompany + '/getBack?idCompany='+idCompany)
    .pipe(catchError(this.handleErrorGet))
  }

  updateAntecedentesLegales(background : Background): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addBack',background)
    .pipe(catchError(this.handleErrorUpd));
  }
  addCompanyRelation(obj : CompanyRelation): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/addCompanyRelation',obj)
  }
  getCompanyRelation(id : number): Observable<Response<CompanyRelation>>{
    return this.http.get<Response<CompanyRelation>>(this.url + this.controllerCompany + '/getCompanyRelation?id='+id)
  }
  getListCompanyRelation(idCompany : number): Observable<Response<CompanyRelationT[]>>{
    return this.http.get<Response<CompanyRelationT[]>>(this.url + this.controllerCompany + '/getListCompanyRelation?idCompany='+idCompany)
  }
  deleteCompanyRelation(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteCompanyRelation?id='+id,'')
  }
  private handleErrorGet(error: any) {
    return throwError('Ocurrió un error al obtener los datos: ' + error);
  }
  private handleErrorUpd(error: any) {
    return throwError('Ocurrió un error al actualizar los datos: ' + error);
  }
}
