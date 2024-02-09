import { UserProcess } from './../../../../../models/usuario';
import { UsuarioService } from './../../../../../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Process, UserPermission } from 'app/models/usuario';
import Swal from 'sweetalert2';

export interface Task {
  id : number
  idProcess : number
  idUser : number
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit{
  idEmployee = 0
  listaGerencia : UserProcess[] = []
  listaProduccion : UserProcess[] = []
  listaAdministracion : UserProcess[] = []
  listaFacturacion : UserProcess[] = []

  allComplete1: boolean = false;
  allComplete2: boolean = false;
  allComplete3: boolean = false;
  allComplete4: boolean = false;
  constructor(public dialogRef: MatDialogRef<PermisosComponent>,private usuarioService : UsuarioService,@Inject(MAT_DIALOG_DATA) public data: any,){
    if(data){
      this.idEmployee = data.id
    }
  }
  ngOnInit(): void {
    this.usuarioService.getUserProcess(this.idEmployee).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          const permisos = response.data
          if(permisos){
            this.listaGerencia = permisos.gerencia
            this.listaProduccion = permisos.produccion
            this.listaAdministracion = permisos.administracion
            this.listaFacturacion = permisos.facturacion
          }
        }
      }
    );
  }

  setAllGerencia(completed: boolean) {
    this.allComplete1 = completed;
    if (this.listaGerencia == null) {
      return;
    }
    this.listaGerencia[0].subLevel.forEach(t => (t.enable = completed));
  }
  someCompleteGerencia(): boolean {
    if (this.listaGerencia[0].subLevel == null) {
      return false;
    }
    return this.listaGerencia[0].subLevel.filter(t => t.enable).length > 0 && !this.allComplete1;
  }
  updateAllCompleteGerencia() {
    this.allComplete1 = this.listaGerencia[0].subLevel != null && this.listaGerencia[0].subLevel.every(t => t.enable);
  }
  setAllProduccion(completed: boolean) {
    this.allComplete2 = completed;
    if (this.listaProduccion == null) {
      return;
    }
    this.listaProduccion[0].subLevel.forEach(t => (t.enable = completed));
  }
  someCompleteProduccion(): boolean {
    if (this.listaProduccion[0].subLevel == null) {
      return false;
    }
    return this.listaProduccion[0].subLevel.filter(t => t.enable).length > 0 && !this.allComplete2;
  }
  updateAllCompleteProduccion() {
    this.allComplete2 = this.listaProduccion[0].subLevel != null && this.listaProduccion[0].subLevel.every(t => t.enable);
  }
  setAllAdministracion(completed: boolean) {
    this.allComplete3 = completed;
    if (this.listaAdministracion == null) {
      return;
    }
    this.listaAdministracion[0].subLevel.forEach(t => (t.enable = completed));
  }
  someCompleteAdministracion(): boolean {
    if (this.listaAdministracion[0].subLevel == null) {
      return false;
    }
    return this.listaAdministracion[0].subLevel.filter(t => t.enable).length > 0 && !this.allComplete3;
  }
  updateAllCompleteAdministracion() {
    this.allComplete3 = this.listaAdministracion[0].subLevel != null && this.listaAdministracion[0].subLevel.every(t => t.enable);
  }
  setAllFacturacion(completed: boolean) {
    this.allComplete4 = completed;
    if (this.listaFacturacion == null) {
      return;
    }
    this.listaFacturacion[0].subLevel.forEach(t => (t.enable = completed));
  }
  someCompleteFacturacion(): boolean {
    if (this.listaFacturacion[0].subLevel == null) {
      return false;
    }
    return this.listaFacturacion[0].subLevel.filter(t => t.enable).length > 0 && !this.allComplete4;
  }
  updateAllCompleteFacturacion() {
    this.allComplete4 = this.listaFacturacion[0].subLevel != null && this.listaFacturacion[0].subLevel.every(t => t.enable);
  }
  salir(){
    this.dialogRef.close()
  }
  guardar(){
    let enableGerencia = false
    let enableProduccion = false
    let enableAdministracion = false
    let enableFacturacion = false
    this.listaGerencia[0].subLevel.forEach(element => {
      if(element.enable === true){
        enableGerencia = true
      }
    });
    this.listaProduccion[0].subLevel.forEach(element => {
      if(element.enable === true){
        enableProduccion = true
      }
    });
    this.listaAdministracion[0].subLevel.forEach(element => {
      if(element.enable === true){
        enableAdministracion = true
      }
    });
    this.listaFacturacion[0].subLevel.forEach(element => {
      if(element.enable === true){
        enableFacturacion = true
      }
    });
    this.listaGerencia[0].enable = enableGerencia
    this.listaProduccion[0].enable = enableProduccion
    this.listaAdministracion[0].enable = enableAdministracion
    this.listaFacturacion[0].enable = enableFacturacion
    const permisos : UserPermission= {
      gerencia: this.listaGerencia,
      produccion: this.listaProduccion,
      administracion: this.listaAdministracion,
      facturacion: this.listaFacturacion
    };

    console.log(this.listaGerencia)
    console.log(this.listaProduccion)
    console.log(this.listaAdministracion)
    console.log(this.listaFacturacion)

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
          this.usuarioService.updateUserProcess(permisos).subscribe((response) => {
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
  }

}
