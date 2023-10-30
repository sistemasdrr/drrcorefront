import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ESSALUD, Personal } from 'app/models/mantenimiento/persona/personal';
import { PersonalService } from 'app/services/mantenimiento/personal.service';
import { AgregarEssaludComponent } from './agregar-essalud/agregar-essalud.component';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  breadscrums = [
    {
      title: 'Detalle de Personal',
      items: ['Administración','Mantenimiento'],
      active: 'Detalle',
    },
  ];

  id = 0
  codigo = ""
  tipoDocIdent = ""
  numDocIdent = ""
  email = ""
  apellidos = ""
  nombres = ""
  telCelular = ""
  telFijo = ""
  telEmergencia = ""
  direccion = ""
  estadoCivil = ""
  numHijos = ""
  tipoSangre = ""
  lugarNac = ""
  ciudadNac = ""
  paisNac = ""
  fechaNacimientoDate = new Date()
  fechaNacimiento = ""
  fechaIngresoDate = new Date()
  fechaIngreso = ""
  cargo = ""
  tipoContrato = ""
  CSbanco = ""
  CStipoCuenta = ""
  CSnumCuenta = ""
  CSmoneda = ""
  CCbanco = ""
  CCtipoCuenta = ""
  CCnumCuenta = ""
  CCmoneda = ""
  listaEssalud : ESSALUD[] = []
  files: File[] = []

  personal : Personal = {
    id : 0,
    codigo : '',
    nombres : '',
    apellidos : '',
    telefonoFijo : '',
    telefonoEmergencia : '',
    telefonoCelular : '',
    tipoDocumento : '',
    numDocumento : '',
    direccion : '',
    estadoCivil : '',
    numeroHijos : '',
    fechaNacimiento : '',
    lugarNacimiento1 : '',
    lugarNacimiento2 : '',
    lugarNacimiento3 : '',
    tipoSangre : '',
    email : '',
    fechaIngreso : '',
    cargo : '',
    tipoContrato : '',
    estado : true,
    //CUENTA SUELDO
    CSBanco : '',
    CSTipoCuenta : '',
    CSNumCuenta : '',
    CSMoneda : '',
    //CUENTA CTS
    CCBanco : '',
    CCTipoCuenta : '',
    CCNumCuenta : '',
    CCMoneda : '',
    ESSALUD : []
  }

  columnas = ['id', 'nombre', 'tipoVinculo', 'docIdentidad','accion']
  dataSource : MatTableDataSource<ESSALUD>

  constructor(private router : Router,
    private personalService : PersonalService,
    private activatedRoute : ActivatedRoute,
    public dialog: MatDialog){
      this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    console.log(this.router.url);
    const idRoute = this.activatedRoute.snapshot.paramMap.get('id')
    if(parseInt(idRoute+'') > 0){
      this.id = parseInt(idRoute+'')
      const personal = this.personalService.getPersonalById(this.id)

      this.breadscrums = [
        {
          title: 'Detalle de Personal - ' + personal.nombres + ' ' + personal.apellidos,
          items: ['Administración','Mantenimiento'],
          active: 'Detalle',
        },
      ];
      this.personal = {
        id : personal.id,
        codigo : personal.codigo,
        nombres : personal.nombres,
        apellidos : personal.apellidos,
        telefonoFijo : personal.telefonoFijo,
        telefonoEmergencia : personal.telefonoEmergencia,
        telefonoCelular : personal.telefonoCelular,
        tipoDocumento : personal.tipoDocumento,
        numDocumento : personal.numDocumento,
        direccion : personal.direccion,
        estadoCivil : personal.estadoCivil,
        numeroHijos : personal.numeroHijos,
        fechaNacimiento : personal.fechaNacimiento,
        lugarNacimiento1 : personal.lugarNacimiento1,
        lugarNacimiento2 : personal.lugarNacimiento2,
        lugarNacimiento3 : personal.lugarNacimiento3,
        tipoSangre : personal.tipoSangre,
        email : personal.email,
        fechaIngreso : personal.fechaIngreso,
        cargo : personal.cargo,
        tipoContrato : personal.tipoContrato,
        estado : true,
        //CUENTA SUELDO
        CSBanco : personal.CSBanco,
        CSTipoCuenta : personal.CSTipoCuenta,
        CSNumCuenta : personal.CSNumCuenta,
        CSMoneda : personal.CSMoneda,
        //CUENTA CTS
        CCBanco : personal.CCBanco,
        CCTipoCuenta : personal.CCTipoCuenta,
        CCNumCuenta : personal.CCNumCuenta,
        CCMoneda : personal.CCMoneda,
        ESSALUD : personal.ESSALUD
      }
      this.codigo = personal.codigo
      this.tipoDocIdent = personal.tipoDocumento
      this.numDocIdent = personal.numDocumento
      this.email = personal.email
      this.apellidos = personal.apellidos
      this.nombres = personal.nombres
      this.telCelular = personal.telefonoCelular
      this.telFijo = personal.telefonoFijo
      this.telEmergencia = personal.telefonoEmergencia
      this.direccion = personal.direccion
      this.estadoCivil = personal.estadoCivil
      this.numHijos = personal.numeroHijos
      this.tipoSangre = personal.tipoSangre
      this.lugarNac = personal.lugarNacimiento1
      this.ciudadNac = personal.lugarNacimiento2
      this.paisNac = personal.lugarNacimiento3
      this.fechaNacimiento = personal.fechaNacimiento
      const fechaNacimiento = personal.fechaNacimiento.split('/')
      if(fechaNacimiento.length > 0){
        this.fechaNacimientoDate = new Date(parseInt(fechaNacimiento[2]), parseInt(fechaNacimiento[1])-1, parseInt(fechaNacimiento[0]))
      }
      this.fechaIngreso = personal.fechaIngreso
      const fechaIngreso = personal.fechaIngreso.split('/')
      if(fechaIngreso.length > 0){
        this.fechaIngresoDate = new Date(parseInt(fechaIngreso[2]), parseInt(fechaIngreso[1]), parseInt(fechaIngreso[0]))
      }
      this.cargo = personal.cargo
      this.tipoContrato = personal.tipoContrato
      this.CSbanco = personal.CSBanco
      this.CStipoCuenta = personal.CSTipoCuenta
      this.CSnumCuenta = personal.CSNumCuenta
      this.CSmoneda = personal.CSMoneda
      this.CCbanco = personal.CCBanco
      this.CCtipoCuenta = personal.CCTipoCuenta
      this.CCnumCuenta = personal.CCNumCuenta
      this.CCmoneda = personal.CCMoneda
      this.listaEssalud = personal.ESSALUD
      if(personal.ESSALUD.length > 0){
        this.dataSource = new MatTableDataSource(this.listaEssalud)
      }
    }else if(idRoute?.includes('nuevo')){
      this.breadscrums = [
        {
          title: 'Detalle de Personal - Nuevo',
          items: ['Administración','Mantenimiento'],
          active: 'Detalle',
        },
      ];
    }
  }

  onSelect(event : any) {
    this.files = []

    this.files.push(...event.addedFiles);
    console.log(...event.addedFiles)
    // for (const file of this.files) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //   const base64String = event.target?.result as string;
    //     console.log('Base64 de la imagen:', base64String);
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  agregarEssalud(){
    const dialogRef = this.dialog.open(AgregarEssaludComponent, {
      data: {
      },
    });
  }
  eliminarEssalud(id : number){
    console.log(id)
    this.listaEssalud = this.listaEssalud.filter(x => x.id !== id)
    this.dataSource.data = this.listaEssalud
  }
  guardarDatos(){
    this.personal = {
      id : this.id,
      codigo : this.codigo,
      nombres : this.nombres,
      apellidos : this.apellidos,
      telefonoFijo : this.telFijo,
      telefonoEmergencia : this.telEmergencia,
      telefonoCelular : this.telCelular,
      tipoDocumento : this.tipoDocIdent,
      numDocumento : this.numDocIdent,
      direccion : this.direccion,
      estadoCivil : this.estadoCivil,
      numeroHijos : this.numHijos,
      fechaNacimiento : this.fechaNacimiento,
      lugarNacimiento1 : this.lugarNac,
      lugarNacimiento2 : this.ciudadNac,
      lugarNacimiento3 : this.paisNac,
      tipoSangre : this.tipoSangre,
      email : this.email,
      fechaIngreso : this.fechaIngreso,
      cargo : this.cargo,
      tipoContrato : this.tipoContrato,
      estado : true,
      //CUENTA SUELDO
      CSBanco : this.CSbanco,
      CSTipoCuenta : this.CStipoCuenta,
      CSNumCuenta : this.CSnumCuenta,
      CSMoneda : this.CSmoneda,
      //CUENTA CTS
      CCBanco : this.CCbanco,
      CCTipoCuenta : this.CCtipoCuenta,
      CCNumCuenta : this.CCnumCuenta,
      CCMoneda : this.CCmoneda,
      ESSALUD : this.listaEssalud
    }
    this.personalService.updatePersonal(this.personal)
    this.router.navigate(['mantenimiento/personal/lista'])
  }
  volver(){
    this.router.navigate(['mantenimiento/personal/lista'])
  }

}
