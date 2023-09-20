import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly CACHE_KEY = 'authCache';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          if (user) {
            const cacheData = {
              isLogin: true,
              timestamp: new Date().getTime(),
            };
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.CACHE_KEY);
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }

  getIsLoginValue() {
    const cacheData = JSON.parse(localStorage.getItem(this.CACHE_KEY) || '{}');
    const timestamp = cacheData.timestamp || 0;
    const currentTime = new Date().getTime();
    const isCacheValid = currentTime - timestamp < 3600000;

    return isCacheValid && cacheData.isLogin === true;
  }
}
