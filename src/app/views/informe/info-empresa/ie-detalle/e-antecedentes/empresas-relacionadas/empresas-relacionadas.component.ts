import { Component, Inject } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpresaRelacionada } from 'app/models/informes/empresa-relacionada';
import { EmpresaRelacionadaService } from 'app/services/informes/empresa-relacionada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas-relacionadas',
  templateUrl: './empresas-relacionadas.component.html',
  styleUrls: ['./empresas-relacionadas.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class EmpresasRelacionadasComponent {
  accion = ""
  titulo = ""

  id : number = 0

  constructor(
    public dialogRef: MatDialogRef<EmpresasRelacionadasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private empresaRelacionadaService : EmpresaRelacionadaService,
  ){

  }
  volver(){
    Swal.fire({
      title: '¿Está seguro de salir?',
      text: "Los datos ingresados no se guardaran",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close()
      }
    })
  }
  agregar(){
    const obj : EmpresaRelacionada = {
      id : 1,
      razonSocial : "3M COLOMBIA",
      pais : "COLOMBIA",
      situacion : "AC",
      fechaEstablecimiento : "09/03/1961",
      registroTributario : "8600026933",
      estado : "estado 1"
    }
    this.empresaRelacionadaService.AddEmpresaRelacionada(obj)
    Swal.fire({
      title :'¡Registrado!',
      text : 'El registro se guardo correctamente.',
      icon : 'success',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        this.dialogRef.close()
      }
    })
  }
  editar(){
    Swal.fire({
      title: '¿Está seguro de editar este registro?',
      text: "",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        const obj : EmpresaRelacionada = {
          id : 1,
          razonSocial : "3M COLOMBIA",
          pais : "COLOMBIA",
          situacion : "AC",
          fechaEstablecimiento : "09/03/1961",
          registroTributario : "8600026933",
          estado : "estado 1"
        }
        this.empresaRelacionadaService.UpdateEmpresaRelacionada(obj)
        Swal.fire({
          title :'¡Actualizado!',
          text : 'El registro se edito correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        }).then((result) => {
          if (result.value) {
            this.dialogRef.close()
          }
        })
      }
    })
  }
}
