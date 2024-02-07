import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from 'app/models/combo';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url = environment.apiUrl
  controller = "/Combo"
  constructor(private http : HttpClient) {
  }
  getPaises(): Observable<Response<Pais[]>> {
    return this.http.get<Response<Pais[]>>(this.url + this.controller + '/country');
  }
}
