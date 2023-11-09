import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from 'app/models/pais';
import { Asignacion } from 'app/models/pedidos/asignacion/asignacion';
import { Pedido } from 'app/models/pedidos/pedido';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  orders: Pedido[] = [
    {
      id: 1,
      cupon: '432412',
      informeEP : 'E',
      idioma : 'ESPAÑOL',
      codigoInforme: 'Z0015212165',
      estadoPedido : 'PENDIENTE',
      tipoInforme: 1,
      tipoTramite : 1,
      calidad: 'B',
      fechaIngreso: '12/09/2023',
      fechaVencimiento: '19/09/2024',
      fechaVencimientoReal: '20/09/2024',
      fechaDescarga: '19/09/2024',

      //ABONADO
      idAbonado: "1",
      nombre: "Abonado 1 ",
      codigo: "12345",
      revelarNombre: true,
      pais: 182,
      codigoPais: "pe",
      estado: "INACTIVO",
      nroReferencia: "1234546789",
      creditoConsultado: "1 000 000",
      indicaciones: "Aqui van las indicaciones",
      dtsAdicionales: "Datos adicionales",
      nombreRealEmpresa : 'nombre real',
      nombreSolicitadoEmpresa : 'nombre solicitado',
      tipoRT : 'tipo rt',
      codigoRT : 'codigo rt',
      continenteEmpresa : 1,
      paisEmpresa : 1,
      ciudadEmpresa : 'ciudad',
      direccionEmpresa : 'direccion',
      correoEmpresa : 'correo',
      telefonoEmpresa : 'telefono',
      precioInforme: 50,
      //ASIGNACIONES
      asignacion : [
        {
          id: 1,
          trabajador: {
            id: 2,
            tipo: 'Reportero',
            codigo: 'R11',
            nombre: 'Julio Enrique Del Risco L.'
          },
          referencias: 'referencias',
          observaciones: 'observaciones',
          fechaAsignacion: '26/10/2023',
          fechaVencimiento : '31/10/2023',
          fechaEntrega: '30/10/2023',
          calidad: 'A',
          precio: 50
        }
      ],
      adjuntos : [
        {
          id: 1,
          name: "karinto.pdf",
          type: "PDF",
          path: "/Downloads/archivo1.pdf",
          data: "b64"
        },
        {
          id: 2,
          name: "karinto.docx",
          type: "WORD",
          path: "/Downloads/archivo1.docx",
          data: "b64"
        },
        {
          id: 3,
          name: "karinto.xlsx",
          type: "EXCEL",
          path: "/Downloads/archivo1.xlsx",
          data: "b64"
        },
      ]
    }
  ]

  url = environment.apiUrl
  controller = "/Combo"
  constructor(private http : HttpClient) {
  }
  getPaises(): Observable<any> {
    return this.http.get<Pais[]>(this.url + this.controller + '/country');
  }
  getContinente(): Observable<any> {
    return this.http.get<any>(this.url + this.controller + '/continent');
  }
  getPaisPorContinente(continent : number):  Observable<any>{
    return this.http.get<any>(this.url + this.controller + '/countrybycontinent?continent='+continent);
  }
  getOrders() {
    return this.orders;
  }
  getCommentByCupon(cupon: string) {
    return this.orders.filter((x) => x.cupon === cupon);
  }
  getAttachmentsByCupon(cupon: string) {
    const order = this.orders.filter((x) => x.cupon === cupon)
    return order[0].adjuntos
  }
  getLastNumCupon(){
    let maxCupon = 0
    for(let i = 0; i < this.orders.length ; i++){
      if(maxCupon < parseInt(this.orders[i].cupon)){
        maxCupon = parseInt(this.orders[i].cupon)
      }
    }
    return maxCupon
  }
  addAsignacionCupon(cupon: string, asignacion: Asignacion) {
    const index = this.orders.findIndex(x => x.cupon === cupon);
    if (index !== -1) {
      this.orders[index].asignacion.push(asignacion)
    }
  }
  deleteAsignacionCupon(cupon : string, idAsignacion : number){
    const indexPedido = this.orders.findIndex(x => x.cupon === cupon);
    if (indexPedido !== -1) {
      const indexAsignacion = this.orders[indexPedido].asignacion
    }
  }

}

