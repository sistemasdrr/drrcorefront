import { Injectable } from '@angular/core';
import { User } from 'app/models/login/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user : User[] = [
    {
      id : 1,
      idEmployee : 1,
      username : "Gerencia",
      password : "pswGerencia",
      fecCreate : "6/10/2023",
      fecUpdate : "",
      fecDelete : "",
      enable : true
    }
  ]

  constructor() { }
}
