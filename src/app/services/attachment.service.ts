import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http : HttpClient) { }

  probarApi(): Observable<any>{
    const url = "https://localhost:7003/api/Token/GetToken"
    return this.http.get<any>(url);
  }


}
