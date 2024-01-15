import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkerHistory } from 'app/models/informes/empresa/ramo-negocios';
import { RamoNegociosService } from 'app/services/informes/empresa/ramo-negocios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-historial-trabajador',
  templateUrl: './agregar-historial-trabajador.component.html',
  styleUrls: ['./agregar-historial-trabajador.component.scss']
})
export class AgregarHistorialTrabajadorComponent implements OnInit{

  titulo = ""

  id = 0
  idCompany = 0
  numberWorker = 0
  numberYear = 0
  observations = ""

  modelo : WorkerHistory[] = []
  constructor(private ramoNegocioService : RamoNegociosService,@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef : MatDialogRef<AgregarHistorialTrabajadorComponent>){
    if(data){
      this.id = data.id
      this.idCompany = data.idCompany
    }
    if(this.id !== 0){
      this.titulo = "Agregar Historial de Trabajadores"
    }else{

      this.titulo = "Editar Historial de Trabajadores"
    }
  }
  ngOnInit(): void {
    if(this.id != 0){
      this.ramoNegocioService.getWorkerHistory(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const workerHistory = response.data
            if(workerHistory){
              this.idCompany = workerHistory.idCompany
              this.numberWorker = workerHistory.numberWorker
              this.numberYear = workerHistory.numberYear
              this.observations = workerHistory.observations
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
      numberWorker : this.numberWorker,
      numberYear : this.numberYear,
      observations : this.observations
    }
  }
  realizarEnvioCodigo(){
    this.armarModelo()
    if(this.id > 0){
      console.log(this.modelo[0])
      Swal.fire({
        title: '¿Está seguro de guardar los cambios?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.ramoNegocioService.addWorkerHistory(this.modelo[0]).subscribe((response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Se guardaron los cambios correctamente',
              text: "",
              icon: 'success',
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto: true
            }).then(
              () => {
                this.dialogRef.close({
                  success : true
                })
              }
            )
          }else{
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema.',
              text: 'Comunicarse con Sistemas',
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          }
          if(loader){
            loader.classList.add('hide-loader');
          }
        })
        }
      });
    }else{
      console.log(this.modelo[0])
      Swal.fire({
        title: '¿Está seguro de agregar este registro?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        width: '30rem',
        heightAuto: true
      }).then((result) => {
        if (result.value) {
          const loader = document.getElementById('loader-lista-empresas') as HTMLElement | null;
          this.ramoNegocioService.addWorkerHistory(this.modelo[0]).subscribe((response) => {
            if(loader){
              loader.classList.remove('hide-loader');
            }
            if(response.isSuccess === true && response.isWarning === false){
              if(loader){
                loader.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Se agregó el registro correctamente',
                text: "",
                icon: 'success',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto: true
              }).then(() => {
                this.dialogRef.close({
                  success : true
                })
              })
            }else{
              if(loader){
                loader.classList.add('hide-loader');
              }
              Swal.fire({
                title: 'Ocurrió un problema.',
                text: 'Comunicarse con Sistemas',
                icon: 'warning',
                confirmButtonColor: 'blue',
                confirmButtonText: 'Ok',
                width: '30rem',
                heightAuto : true
              }).then(() => {
              })
            }
            if(loader){
              loader.classList.add('hide-loader');
            }
            console.log(response)
          }, (error) => {
            if(loader){
              loader.classList.add('hide-loader');
            }
            Swal.fire({
              title: 'Ocurrió un problema. Comunicarse con Sistemas',
              text: error,
              icon: 'warning',
              confirmButtonColor: 'blue',
              confirmButtonText: 'Ok',
              width: '30rem',
              heightAuto : true
            }).then(() => {
            })
          })
        }
      });
    }
  }
  cerrarDialog(){
    this.dialogRef.close()
  }
}
