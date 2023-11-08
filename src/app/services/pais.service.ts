import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from 'app/models/pais';
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
  getPaises(): Observable<any> {
    return this.http.get<Pais[]>(this.url + this.controller + '/country');
  }
}
