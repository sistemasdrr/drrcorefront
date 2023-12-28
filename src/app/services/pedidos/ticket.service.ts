import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentTicket, ListTicket, ReportType, Ticket } from 'app/models/pedidos/ticket';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url = environment.apiUrl
  controllerTicket = "/Ticket"

  constructor(private http : HttpClient) { }

  getTicketActual() : Observable<Response<CurrentTicket>>{
    return this.http.get<Response<CurrentTicket>>(this.url + this.controllerTicket + '/numberticket');
  }
  addTicket(obj : Ticket) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/add',obj);
  }
  getTipoReporte(id : number, type : string) : Observable<Response<ReportType>>{
    return this.http.get<Response<ReportType>>(this.url + this.controllerTicket + '/getreporttype?id='+id+'&type='+type);
  }
  getList() : Observable<Response<ListTicket[]>>{
    return this.http.get<Response<ListTicket[]>>(this.url + this.controllerTicket + '/getList');
  }
  getById(id : number) : Observable<Response<Ticket>>{
    return this.http.get<Response<Ticket>>(this.url + this.controllerTicket + '/getTicketById?id='+id);
  }
  deleteTicket(id : number) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(this.url + this.controllerTicket + '/deleteTicket?id='+id,'');
  }
}
