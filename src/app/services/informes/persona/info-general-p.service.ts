import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoGeneralP } from 'app/models/informes/persona/info-general';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoGeneralPService {

  url = environment.apiUrl
  controllerPersona = "/Person"
  constructor(private http : HttpClient) { }

  getInfoGeneral(idPerson : number): Observable<Response<InfoGeneralP>>{
    return this.http.get<Response<InfoGeneralP>>(this.url + this.controllerPersona + '/getPersonGeneralInfo?idPerson='+idPerson)
  }
  addInfoGeneral(obj : InfoGeneralP): Observable<Response<number>>{
    return this.http.post<Response<number>>(this.url + this.controllerPersona + '/addPersonGeneralInfo',obj)
  }
}
