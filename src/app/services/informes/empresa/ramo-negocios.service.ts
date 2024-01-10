import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyBranch, ImportAndExport, WorkerHistory } from 'app/models/informes/empresa/ramo-negocios';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RamoNegociosService {

  url = environment.apiUrl
  controllerCompany = "/Company"
  constructor(private http : HttpClient) { }

  addRamoNegocio(obj : CompanyBranch): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/addCompanyBranch',obj)
  }
  getRamoNegocioByIdCompany(idCompany : number): Observable<Response<CompanyBranch>>{
    return this.http.get<Response<CompanyBranch>>(this.url + this.controllerCompany + '/getCompanyBranch?idCompany='+idCompany)
  }
  deleteImportExport(id : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteImportAndExport?id='+id,'')
  }
  addImportExport(obj : ImportAndExport): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/addImportAndExport',obj)
  }
  getImportExportById(id : number): Observable<Response<ImportAndExport>>{
    return this.http.get<Response<ImportAndExport>>(this.url + this.controllerCompany + '/getImportAndExportById?id='+id)
  }
  getListImportExport(idCompany : number, type : string): Observable<Response<ImportAndExport[]>>{
    return this.http.get<Response<ImportAndExport[]>>(this.url + this.controllerCompany + '/getImportsAndExportsByIdCompany?idCompany='+idCompany+'&type='+type)
  }
  addWorkerHistory(obj : WorkerHistory): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/addWorkerHistory',obj)
  }
  getWorkerHistory(id : number): Observable<Response<WorkerHistory>>{
    return this.http.get<Response<WorkerHistory>>(this.url + this.controllerCompany + '/getWorkerHistory?id='+id)
  }
  getListWorkerHistory(idCompany : number): Observable<Response<WorkerHistory[]>>{
    return this.http.get<Response<WorkerHistory[]>>(this.url + this.controllerCompany + '/getListWorkerHistory?idCompany='+idCompany)
  }
  deleteWorkerHistory(id : number): Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/deleteWorkerHistory?id='+id,'')
  }
}
