import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aniversario } from 'app/models/login/aniversario';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechasImportantesService {
  url = environment.apiUrl
  controllerAniversario = "/Master"

  constructor(private http : HttpClient) { }

  getFechasImportantes(): Observable<Response<Aniversario[]>>{
    return this.http.get<Response<Aniversario[]>>(this.url + this.controllerAniversario + '/getCurrentAnniversary');
  }
}
