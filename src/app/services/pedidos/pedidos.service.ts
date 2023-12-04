import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderT } from 'app/models/pedidos/pedido';
import { Response } from 'app/models/response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  url = environment.apiUrl
  controllerCompany = "/Orders"

  constructor(private http : HttpClient) {
  }
  getOrders(cupon : string, nombreInforme : string, codigoAbonado : number, tipoInforme : string, tipoTramite : string): Observable<Response<OrderT[]>>{
    return this.http.post<Response<OrderT[]>>(this.url + this.controllerCompany + '/getOrders?cupon='+cupon+'&informe='+nombreInforme+'&codigoAbonado='+codigoAbonado,'')
  }
}
