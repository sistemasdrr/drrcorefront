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
  listaGerencia : number[] = []
  listaProduccion : number[] = []
  listaAdministracion : number[] = []
  task1: Task = {
    id : 0,
    idProcess : 0,
    idUser : 0,
    name: 'Gerencia',
    completed: false,
    color: 'primary',
    subtasks: []
  };
  task2: Task = {
    id : 0,
    idProcess : 0,
    idUser : 0,
    name: 'Producción',
    completed: false,
    color: 'primary',
    subtasks: [],
  };
  task3: Task = {
    id : 0,
    idProcess : 0,
    idUser : 0,
    name: 'Administración',
    completed: false,
    color: 'primary',
    subtasks: [
    ],
  };

  allComplete1: boolean = false;
  allComplete2: boolean = false;
  allComplete3: boolean = false;
  constructor(public dialogRef: MatDialogRef<PermisosComponent>,private usuarioService : UsuarioService,@Inject(MAT_DIALOG_DATA) public data: any,){
    if(data){
      this.idEmployee = data.id
    }
  }
  ngOnInit(): void {
    this.usuarioService.getProcess().subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          response.data.filter(x => x.menu === "Gerencia").forEach(item => {
            this.task1.subtasks?.push({
              id : 0,idProcess : item.id,idUser : 0, name : item.name, completed : false,color : 'warn'
            })
          });
          response.data.filter(x => x.menu === "Producción").forEach(item => {
            this.task2.subtasks?.push({
              id : 0,idProcess : item.id,idUser : 0, name : item.name, completed : false,color : 'warn'
            })
          });
          response.data.filter(x => x.menu === "Administración").forEach(item => {
            this.task3.subtasks?.push({
              id : 0,idProcess : item.id,idUser : 0, name : item.name, completed : false,color : 'warn'
            })
          });
        }
      }
    ).add(
      () => {
        this.usuarioService.getUserProcess(this.idEmployee).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              console.log(response.data)
              response.data.gerencia.forEach(userProcess => {
                this.task1.subtasks?.forEach(process => {
                  if(process.idProcess === userProcess.idProcess){
                    process.id = userProcess.id
                    process.idUser = userProcess.idUser
                    process.idProcess = userProcess.idProcess
                    process.completed = userProcess.enable
                  }
                });
              });
              response.data.produccion.forEach(userProcess => {
                this.task2.subtasks?.forEach(process => {
                  if(process.idProcess === userProcess.idProcess){
                    process.id = userProcess.id
                    process.idUser = userProcess.idUser
                    process.idProcess = userProcess.idProcess
                    process.completed = userProcess.enable
                  }
                });
              });
              response.data.administracion.forEach(userProcess => {
                this.task3.subtasks?.forEach(process => {
                  if(process.idProcess === userProcess.idProcess){
                    process.id = userProcess.id
                    process.idUser = userProcess.idUser
                    process.idProcess = userProcess.idProcess
                    process.completed = userProcess.enable
                  }
                });
              });
            }
          }
        )
      }
    )
  }
  someComplete1(): boolean {
    if (this.task1.subtasks == null) {
      return false;
    }
    return this.task1.subtasks.filter(t => t.completed).length > 0 && !this.allComplete1;
  }

  setAll1(completed: boolean) {
    this.allComplete1 = completed;
    if (this.task1.subtasks == null) {
      return;
    }
    this.task1.subtasks.forEach(t => (t.completed = completed));
  }
  updateAllComplete1() {
    this.allComplete2 = this.task2.subtasks != null && this.task2.subtasks.every(t => t.completed);
  }
  someComplete2(): boolean {
    if (this.task2.subtasks == null) {
      return false;
    }
    return this.task2.subtasks.filter(t => t.completed).length > 0 && !this.allComplete2;
  }

  setAll2(completed: boolean) {
    this.allComplete2 = completed;
    if (this.task2.subtasks == null) {
      return;
    }
    this.task2.subtasks.forEach(t => (t.completed = completed));
  }
  updateAllComplete2() {
    this.allComplete2 = this.task2.subtasks != null && this.task2.subtasks.every(t => t.completed);
  }
  someComplete3(): boolean {
    if (this.task3.subtasks == null) {
      return false;
    }
    return this.task3.subtasks.filter(t => t.completed).length > 0 && !this.allComplete3;
  }

  setAll3(completed: boolean) {
    this.allComplete3 = completed;
    if (this.task3.subtasks == null) {
      return;
    }
    this.task3.subtasks.forEach(t => (t.completed = completed));
  }
  updateAllComplete3() {
    this.allComplete3 = this.task3.subtasks != null && this.task3.subtasks.every(t => t.completed);
  }
  salir(){
    this.dialogRef.close()
  }
  guardar(){
    console.log(this.task2.subtasks)
    const permisos : UserPermission[] = [{ gerencia: [], produccion: [], administracion: [] }];
    this.task1.subtasks?.forEach(element => {
      const obj : UserProcess = {
        id : element.id,
        idProcess : element.idProcess,
        idUser : element.idUser,
        enable : element.completed
      }
      console.log(obj)
      permisos[0].gerencia.push(obj)
    });
    this.task2.subtasks?.forEach(element => {
      const obj : UserProcess = {
        id : element.id,
        idProcess : element.idProcess,
        idUser : element.idUser,
        enable : element.completed
      }
      permisos[0].produccion.push(obj)
    });
    this.task3.subtasks?.forEach(element => {
      const obj : UserProcess = {
        id : element.id,
        idProcess : element.idProcess,
        idUser : element.idUser,
        enable : element.completed
      }
      permisos[0].administracion.push(obj)
    });
    console.log(permisos)

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
          this.usuarioService.updateUserProcess(permisos[0]).subscribe((response) => {
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
