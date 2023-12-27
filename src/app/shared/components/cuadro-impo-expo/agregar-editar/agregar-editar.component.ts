import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImpoExpoData } from '../cuadro-impo-expo.component';
import { RamoNegociosService } from 'app/services/informes/empresa/ramo-negocios.service';
import Swal from 'sweetalert2';
import { ImportAndExport } from 'app/models/informes/empresa/ramo-negocios';

@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.scss']
})
export class AgregarEditarComponent implements OnInit {
  titulo = ""
  id = 0
  idCompany = 0
  type = ""
  year = 0
  amount = ""
  observation = ""
  observationEng = ""

  modelo : ImportAndExport[] = []

  constructor(public dialogRef: MatDialogRef<AgregarEditarComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private ramoNegocioService : RamoNegociosService) {
    if(data){
      this.titulo = data.titulo
      this.id = data.id
      this.idCompany = data.idCompany
      this.type = data.type
    }
  }

  ngOnInit(): void {
    if(this.id !== 0){
      this.ramoNegocioService.getImportExportById(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const impoExpo = response.data
            if(impoExpo){
              this.year = impoExpo.year
              this.amount = impoExpo.amount
              this.observation = impoExpo.observation
              this.observationEng = impoExpo.observationEng
            }
          }
        }
      )
    }
  }
  armarModelo(){
    this.modelo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      type : this.type,
      year : this.year,
      amount : this.amount,
      observation : this.observation,
      observationEng : this.observationEng
    }
  }
  guardar(){
    this.armarModelo()
    console.log(this.modelo[0])
    if(this.id === 0){
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.ramoNegocioService.addImportExport(this.modelo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'',
                  text : 'El registro se agregó correctamente.',
                  icon : 'success',
                  width: '30rem',
                  heightAuto : true
                }).then(() => {
                  this.dialogRef.close()
                });
              }
            }
          )
        }
      })
    }else{
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText : 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.ramoNegocioService.addImportExport(this.modelo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'',
                  text : 'El registro se modificó correctamente.',
                  icon : 'success',
                  width: '30rem',
                  heightAuto : true
                }).then(() => {
                  this.dialogRef.close()
                });
              }
            }
          )
        }
      })
    }
  }
  cerrarDialog(){
    this.dialogRef.close()
  }
}
