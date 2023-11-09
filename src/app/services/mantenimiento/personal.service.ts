import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personal } from 'app/models/mantenimiento/persona/personal';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface data{
  id : number
  valor : string
}

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  listaPersonal : Personal[] = [
    {
      id : 1,
      codigo : 'cod1',
      nombres : 'Julio Enrique',
      apellidos : 'Del Risco Aliaga',
      telefonoFijo : '511 2212235',
      telefonoEmergencia : '',
      telefonoCelular : '51 994 156 974',
      tipoDocumento : 1,
      numDocumento : '6640754',
      direccion : 'direcion...',
      estadoCivil : 2,
      numeroHijos : '2',
      fechaNacimiento : '31/05/1963',
      lugarNacimiento : 'Lima',
      ciudadNacimiento : 'Lima',
      paisNacimiento : {
        id: 182,
        valor: "Perú",
        bandera: "pe"
      },
      tipoSangre : 'RH+',
      email : 'juliojr@del-risco.com',
      fechaIngreso : '',
      departamento : 1,
      cargo : 2,
      tipoContrato : '',
      estado : true,
      //CUENTA SUELDO
      CSBanco : 'SCOTIABANK',
      CSTipoCuenta : 4,
      CSNumCuenta : '8311654087',
      CSMoneda : 'Dolares',
      //CUENTA CTS
      CCBanco : 'INTERBANK',
      CCTipoCuenta : 5,
      CCNumCuenta : '573162740388',
      CCMoneda : 'Dolares',
      ESSALUD : [
        {
          id : 1,
          nombre : 'Nombre 1',
          tipoVinculo : 1,
          documentoIdentidad : 'dni'
        },
        {
          id : 2,
          nombre : 'Nombre 2',
          tipoVinculo : 1,
          documentoIdentidad : 'dni'
        },
      ]
    }
  ]

  url = environment.apiUrl
  controller = "/Combo"

  constructor(private http : HttpClient) { }

  getPersonales(){
    return this.listaPersonal
  }
  getPersonalById(id : number){
    return this.listaPersonal.filter(x => x.id == id)[0]
  }
  addPersonal(obj : Personal){
    let idMax : number = 0
    for (let i = 0; i < this.listaPersonal.length; i++) {
      const elemento = this.listaPersonal[i]
      if(idMax < elemento.id){
        idMax = elemento.id
      }
    }
    obj.id = idMax+1
    this.listaPersonal.push(obj)
  }
  updatePersonal(obj : Personal){
    const index = this.listaPersonal.findIndex(x => x.id === obj.id);
    if (index !== -1) {
      this.listaPersonal[index] = obj;
    }  }
  deletePersonal(id : number){
    this.listaPersonal = this.listaPersonal.filter(x => x.id !== id)
  }

  getTipoDocumento() : Observable<any>{
    return this.http.get<any>(this.url + this.controller + '/doctype');
  }
  getEstadoCivil() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controller + '/civilstatus');
  }
  getDepartamento() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controller + '/jobdep');
  }
  getCargoPorDepartamento(id : number) : Observable<any>{
    return this.http.get<data[]>(this.url + this.controller + '/jobbydep?department='+id);
  }
  getTipoCuenta() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controller + '/bankaccounttype');
  }
  getVinculoFamiliar() : Observable<any>{
    return this.http.get<data[]>(this.url + this.controller + '/fambondytype');
  }
}
