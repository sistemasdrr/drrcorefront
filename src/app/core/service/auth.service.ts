import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UsuarioService } from 'app/services/usuario.service';
import  jwt_decode  from 'jwt-decode';
import { PersonalService } from 'app/services/mantenimiento/personal.service';
interface DecodedToken {
  IdUser : number
  IdEmployee : number
  username: string;
  role: string;
  exp: Date;
  iat: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly CACHE_KEY = 'authCache';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private usuarioService : UsuarioService, private personalService : PersonalService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User | null> {
    let idUser = 0
    let idEmployee = 0
    return new Observable<User | null>(observer => {
      let users: User[] = [];
      this.usuarioService.Login(username, password).subscribe(
        (response) => {
          if (response.isSuccess === true && response.isWarning === false) {
            const tok = response.data;
            if (tok) {
              const decodedToken: DecodedToken = jwt_decode(response.data);
              const token = decodedToken;
              if (token) {
                this.personalService.getPersonalById(token.IdEmployee).subscribe(
                  (response) => {
                    if (response.isSuccess === true && response.isWarning === false) {
                      idUser = token.IdUser
                      idEmployee = response.data.id
                      users[0] = {
                        id: response.data.id,
                        username: username,
                        password: password,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        token: tok
                      };
                      const cacheData = {
                        isLogin: true,
                        timestamp: new Date().getTime(),
                        idUser : idUser,
                        idEmployee : idEmployee
                      };
                      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
                      this.currentUserSubject.next(users[0]);
                      observer.next(users[0]);
                      observer.complete();
                    }
                  },
                  (error) => {
                    observer.error(error);
                  }
                );
              }
            }
          } else {
            observer.next(null);
            observer.complete();
          }
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.CACHE_KEY);
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  getIsLoginValue() {
    const cacheData = JSON.parse(localStorage.getItem(this.CACHE_KEY) || '{}');
    // const timestamp = cacheData.timestamp || 0;
    // const currentTime = new Date().getTime();
    // const isCacheValid = currentTime - timestamp < 3600000;
    const isCacheValid = 3600000;
    return isCacheValid && cacheData.isLogin === true;
  }
}
