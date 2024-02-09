import { RamoNegocioService } from 'app/services/informes/ramo-negocio.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Actividad, RamoNegocio } from 'app/models/informes/ramo-negocio';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-agregar-editar-ramo-negocio',
  templateUrl: './agregar-editar.component.html',
  styleUrls: ['./agregar-editar.component.scss'],
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
export class AgregarEditarRamoNegocioComponent {
  titulo = ""
  accion = ""
  columnasR : string[] = ['id','enable','nombre','nombreIng', 'accion']
  datosR : RamoNegocio[] = []
  datosA : Actividad[] = []
  dataSourceR : MatTableDataSource<RamoNegocio>
  dataSourceA : MatTableDataSource<Actividad>

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarRamoNegocioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ramoNegocioService : RamoNegocioService
  ) {
    this.datosR = this.ramoNegocioService.getAllRamoNegocio()

    if(this.datosR[0]){
      this.datosA = this.datosR[0].actividades
    }
    this.dataSourceR = new MatTableDataSource(this.datosR)
    this.dataSourceA = new MatTableDataSource(this.datosA)

    this.accion = data.accion
    if(data.accion == 'RAMO'){
      this.titulo = "Ramo de Negocio"
      this.tipo = 'RAMO'
    }else{
      this.titulo = "Actividades Especifica"
      this.tipo = 'ACTIVIDAD'
    }
  }

  id : number = 0
  nombre : string = ''
  nombreIng : string = ''
  enable : boolean = false

  tipo : string = ''

  btnEditar : boolean = false
  btnAgregar : boolean = true
  //RAMA
  buscarRamo : string = ''
  selectRamo : number = 0

  get filtrarRamo(): RamoNegocio[] {
    return this.datosR.filter(act =>
      act.nombre.toLowerCase().includes(this.buscarRamo.toLowerCase())
    );
  }
  seleccionarRamo(event: MatAutocompleteSelectedEvent){
    for (let i = 0; i < this.datosR.length; i++) {
      const elemento = this.datosR.filter(x => x.nombre == event.option.value)
      if(elemento){
        this.datosA = elemento[0].actividades
        this.dataSourceA = new MatTableDataSource(this.datosA)
        break
      }
    }
  }

  //ACTIVIDAD

  SelectEditar(id : number, nombre : string, nombreIng : string, enable : boolean){
    this.id = id
    this.nombre = nombre
    this.nombreIng = nombreIng
    this.enable = enable
    this.btnEditar = true
    this.btnAgregar = false
  }
  editar(){
    if(this.tipo == "RAMO"){
      for (let i = 0; i < this.datosR.length; i++) {
        const elemento = this.datosR[i];
        if (elemento.id == this.id) {
          elemento.nombre = this.nombre
          elemento.nombreIng = this.nombreIng
          elemento.enable = this.enable
          this.dataSourceR = new MatTableDataSource(this.datosR)
          break;
        }
      }
    }else{
      for (let i = 0; i < this.datosA.length; i++) {
        const elemento = this.datosA[i];
        if (elemento.id == this.id) {
          elemento.nombre = this.nombre
          elemento.nombreIng = this.nombreIng
          elemento.enable = this.enable
          this.dataSourceA = new MatTableDataSource(this.datosA)
          break;
        }
      }
    }
  }
  limpiar(){
    this.btnAgregar = true
    this.btnEditar = false
    this.id = 0
    this.nombre = ''
    this.nombreIng = ''
    this.enable = false
  }
  eliminar(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
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
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        if(this.tipo == "RAMO"){
          for (let i = 0; i < this.datosR.length; i++) {
            const elemento = this.datosR[i];
            if (elemento.id == id) {
              this.datosR.splice(i, 1);
              this.dataSourceR = new MatTableDataSource(this.datosR)
              break;
            }
          }
        }else{
          for (let i = 0; i < this.datosA.length; i++) {
            const elemento = this.datosA[i];
            if (elemento.id == id) {
              this.dataSourceA.data.splice(i, 1);
              this.dataSourceA = new MatTableDataSource(this.datosA)
              break;
            }
          }
        }
        this.id = 0
        this.nombre = ''
        this.nombreIng = ''
        this.enable = false
        this.btnAgregar = true
        this.btnEditar = false
      }
    });
  }

  agregar(){

    if(this.id == 0 && this.nombre != '' && this.nombreIng != '' ){
      if(this.tipo == "RAMO"){
        const ultimoRegistro = this.datosR[this.datosR.length - 1];
        const idDelUltimoRegistro = ultimoRegistro.id;
        const nuevo: RamoNegocio = {
          id : idDelUltimoRegistro+1,
          nombre : this.nombre,
          nombreIng : this.nombreIng,
          enable : this.enable,
          actividades :[]
        };
        this.datosR.push(nuevo)
        this.dataSourceR = new MatTableDataSource(this.datosR)
        Swal.fire({
          title :'¡Registro Agregado!',
          text : 'Se agrego un nuevo registro.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
      }else{
        let maxId = 0
        for (const ramo of this.datosR) {
          for (const actividad of ramo.actividades) {
            if (actividad.id > maxId) {
              maxId = actividad.id;
            }
          }
        }

        const nuevo: Actividad = {
          id : maxId+1,
          nombre : this.nombre,
          nombreIng : this.nombreIng,
          enable : this.enable,
        };
        this.datosA.push(nuevo)
        this.dataSourceA = new MatTableDataSource(this.datosA)
        Swal.fire({
          title :'¡Registro Agregado!',
          text : 'Se agrego un nuevo registro.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
      }
    }else{
      Swal.fire({
        title: '¡Campos Vacios!',
        text: "Complete todos los campos.",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        width: '20rem',
        heightAuto : true
      })
    }
  }
  salir(){
    this.dialogRef.close()
  }

}
