import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company} from 'app/models/informes/empresa/datos-empresa';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  url = environment.apiUrl
  controllerCompany = "/Company"

  constructor(private http : HttpClient) {
  }
  getDatosEmpresas(razonSocial : string, tipoFiltro : string, idPais : number, conInforme : boolean): Observable<Response<Company[]>>{
    return this.http.post<Response<Company[]>>(this.url + this.controllerCompany + '/getbyname?name='+razonSocial,'');
  }
  getDatosEmpresaPorId(id : number): Observable<Response<Company>>{
    return this.http.post<Response<Company>>(this.url + this.controllerCompany + '/get?id='+id,'');
  }
  AddDatosEmpresa(company : Company) :Observable<Response<Company>>{
    return this.http.post<Response<Company>>(this.url + this.controllerCompany + '/add', company);
  }
  updateDatosEmpresa(company : Company){
    return this.http.post<Response<Company>>(this.url + this.controllerCompany + '/add',company);
  }
  deleteDatosEmpresa(id : number) :Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/delete?id='+id,'');
  }
}
