import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'app/models/response';
import { Process, User, UserPermission } from 'app/models/usuario';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.apiUrl
  controller = "/User"
  constructor(private http : HttpClient) {
  }
  getProcess(): Observable<Response<Process[]>> {
    return this.http.get<Response<Process[]>>(this.url + this.controller + '/GetProcess');
  }
  Login(username : string, password : string): Observable<Response<string>> {
    return this.http.get<Response<string>>(this.url + this.controller + '/Login?username='+username+'&password='+password);
  }
  getUser(id : number): Observable<Response<User>> {
    return this.http.get<Response<User>>(this.url + this.controller + '/User?id='+id);
  }
  getUserProcess(idEmployee : number) : Observable<Response<UserPermission>>{
    return this.http.get<Response<UserPermission>>(this.url + this.controller + '/UserProcess?id='+idEmployee);
  }
  updateUserProcess(obj : UserPermission) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controller + '/UpdateProcess',obj);
  }
}
