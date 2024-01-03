import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, TCompany} from 'app/models/informes/empresa/datos-empresa';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosEmpresaService {

  url = environment.apiUrl
  controllerCompany = "/Company"

  constructor(private http : HttpClient) {
  }
  getDatosEmpresas(razonSocial : string, tipoFiltro : string, idPais : number, conInforme : boolean): Observable<Response<TCompany[]>>{
    return this.http.post<Response<TCompany[]>>(this.url + this.controllerCompany + '/getbyname?name='+razonSocial+'&form='+tipoFiltro+'&idCountry='+idPais,'')
    .pipe(catchError(this.handleErrorGet));
  }
  activarWebEmpresa(id : number) :Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/activeweb?id='+id,'')
  }
  desactivarWebEmpresa(id : number) :Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/desactiveweb?id='+id,'')
  }
  getDatosEmpresaPorId(id : number): Observable<Response<Company>>{
    return this.http.post<Response<Company>>(this.url + this.controllerCompany + '/get?id='+id,'')
    .pipe(catchError(this.handleErrorGet));
  }
  AddDatosEmpresa(company : Company) :Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerCompany + '/add', company)
    .pipe(catchError(this.handleErrorUpd));
  }
  deleteDatosEmpresa(id : number) :Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerCompany + '/delete?id='+id,'')
    .pipe(catchError(this.handleErrorDel));
  }

  private handleErrorGet(error: any) {
    return throwError('Ocurrió un error al obtener los datos: ' + error);
  }
  private handleErrorUpd(error: any) {
    return throwError('Ocurrió un error al actualizar los datos: ' + error);
  }
  private handleErrorDel(error: any) {
    return throwError('Ocurrió un error al eliminar el registro: ' + error);
  }
}
