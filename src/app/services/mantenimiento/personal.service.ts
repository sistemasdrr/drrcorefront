import { Injectable } from '@angular/core';
import { Personal } from 'app/models/mantenimiento/persona/personal';

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
      tipoDocumento : 'DNI',
      numDocumento : '6640754',
      direccion : '',
      estadoCivil : 'Casado(a)',
      numeroHijos : '2',
      fechaNacimiento : '31/05/1963',
      lugarNacimiento1 : 'Lima',
      lugarNacimiento2 : 'Lima',
      lugarNacimiento3 : 'Lima',
      tipoSangre : 'RH+',
      email : 'juliojr@del-risco.com',
      fechaIngreso : '',
      cargo : 'cargo',
      tipoContrato : '',
      estado : true,
      //CUENTA SUELDO
      CSBanco : 'SCOTIABANK',
      CSTipoCuenta : 'Cuenta Sueldo',
      CSNumCuenta : '8311654087',
      CSMoneda : 'Dolares',
      //CUENTA CTS
      CCBanco : 'INTERBANK',
      CCTipoCuenta : '',
      CCNumCuenta : '573162740388',
      CCMoneda : 'Dolares',
      ESSALUD : [
        {
          id : 1,
          nombre : 'Nombre 1',
          tipoVinculo : 'tipo de vinculo',
          documentoIdentidad : 'dni'
        },
        {
          id : 2,
          nombre : 'Nombre 2',
          tipoVinculo : 'tipo de vinculo',
          documentoIdentidad : 'dni'
        },
      ]
    }
  ]

  constructor() { }

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
}
