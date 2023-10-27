import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ESSALUD } from 'app/models/mantenimiento/persona/personal';
import { PersonalService } from 'app/services/mantenimiento/personal.service';

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

  columnas = ['id', 'nombre', 'tipoVinculo', 'docIdentidad','accion']
  dataSource : MatTableDataSource<ESSALUD>

  constructor(private router : Router,
    private personalService : PersonalService,
    private activatedRoute : ActivatedRoute){
      this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    console.log(this.router.url);
    const idRoute = this.activatedRoute.snapshot.paramMap.get('id')
    if(idRoute){
      this.id = parseInt(idRoute)
      const personal = this.personalService.getPersonalById(this.id)
      this.tipoDocIdent = personal.tipoDocumento
      this.numDocIdent = personal.numDocumento
      this.email = personal.email
      this.apellidos = personal.apellidos
      this.nombres = personal.nombres
      this.telCelular = personal.telefonoCelular
      this.telFijo = personal.telefonoFijo
      this.telEmergencia = personal.telefonoEmergencia
      this.direccion = personal.telefonoEmergencia
      this.estadoCivil = personal.estadoCivil
      this.numHijos = personal.numeroHijos
      this.tipoSangre = personal.tipoSangre
      this.lugarNac = personal.lugarNacimiento1
      this.ciudadNac = personal.lugarNacimiento2
      this.paisNac = personal.lugarNacimiento3
      this.fechaNacimiento = personal.fechaNacimiento
      const fechaNacimiento = personal.fechaNacimiento.split('/')
      if(fechaNacimiento.length > 0){
        this.fechaNacimientoDate = new Date(parseInt(fechaNacimiento[2]), parseInt(fechaNacimiento[1]), parseInt(fechaNacimiento[0]))
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
      if(personal.ESSALUD.length > 0){
        this.dataSource = new MatTableDataSource(personal.ESSALUD)
      }
    }
  }

  volver(){
    this.router.navigate(['mantenimiento/personal/lista'])
  }

}
