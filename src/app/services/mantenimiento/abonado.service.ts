import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbonadoT } from 'app/models/mantenimiento/abonado/abonado';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbonadoService {
  url = environment.apiUrl
  controllerCombo = "/Combo"
  controllerMaster = "/Master"
  controllerAbonado = "/"

  constructor(private http : HttpClient) { }

  getAbonados(code : string, name : string, state : string): Observable<Response<AbonadoT[]>>{
    return this.http.get<Response<AbonadoT[]>>(this.url + this.controllerMaster + '/getAbonado?code='+code+'&name='+name+'&state='+state);
  }

  deleteAbonado(id : number): Observable<Response<boolean>>{
    return this.http.get<Response<boolean>>(this.url + this.controllerMaster + '/deleteAbonado?id='+id);
  }
}
