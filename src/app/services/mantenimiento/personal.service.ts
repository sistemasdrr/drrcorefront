import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personal } from 'app/models/mantenimiento/persona/personal';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface data{
  id : number
  valor : string
}

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  url = environment.apiUrl
  controllerCombo = "/Combo"
  controllerMaster = "/Master"

  constructor(private http : HttpClient) { }

  getPersonales(): Observable<any>{
    return this.http.get<any>(this.url + this.controllerMaster + '/getEmployees');
  }
  getPersonalById(id : number): Observable<any>{
    return this.http.get<any>(this.url + this.controllerMaster + '/getEmployeeById?id='+id);
  }
  getPersonalByName(name : string): Observable<any>{
    return this.http.get<any>(this.url + this.controllerMaster + '/getEmployeesByName?name='+name);
  }
  addPersonal(request : Personal):Observable<any>{
    return this.http.post<any>(this.url + this.controllerMaster + '/addEmployee',request);
  }
  deletePersonal(id : number){
    return this.http.post<any>(this.url + this.controllerMaster + '/deleteEmployee?id='+id,'');
  }
  activePersonal(id : number){
    return this.http.post<any>(this.url + this.controllerMaster + '/activeEmployee?id='+id,'');
  }

  getTipoDocumento() : Observable<any>{
    return this.http.get<any>(this.url + this.controllerCombo + '/doctype');
  }
  getTipoMoneda() : Observable<any>{
    return this.http.get<any>(this.url + this.controllerCombo + '/currency');
  }
  getEstadoCivil() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controllerCombo + '/civilstatus');
  }
  getDepartamento() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controllerCombo + '/jobdep');
  }
  getCargoPorDepartamento(id : number) : Observable<any>{
    return this.http.get<data[]>(this.url + this.controllerCombo + '/jobbydep?department='+id);
  }
  getTipoCuenta() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controllerCombo + '/bankaccounttype');
  }
  getVinculoFamiliar() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controllerCombo + '/fambondytype');
  }
}
