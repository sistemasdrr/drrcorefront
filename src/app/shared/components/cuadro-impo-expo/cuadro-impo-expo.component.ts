import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarEditarComponent } from './agregar-editar/agregar-editar.component';
import Swal from 'sweetalert2';
import { ImportAndExport } from 'app/models/informes/empresa/ramo-negocios';
import { RamoNegociosService } from 'app/services/informes/empresa/ramo-negocios.service';

export interface ImpoExpoData{
  id : string
  anio : string
  monto : string
}

@Component({
  selector: 'app-cuadro-impo-expo',
  templateUrl: './cuadro-impo-expo.component.html',
  styleUrls: ['./cuadro-impo-expo.component.scss']
})
export class CuadroImpoExpoComponent implements OnInit{

  idCompany = 0
  titulo = ""
  tipo = ""

  columnsToDisplay = ['año', 'monto', 'accion'];

  dataSource: MatTableDataSource<ImportAndExport>;

  botonDeshabilitado: boolean = true;

  constructor(private dialog : MatDialog, public dialogRef: MatDialogRef<CuadroImpoExpoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private ramoNegocioService : RamoNegociosService) {
    this.titulo = data.titulo
    this.tipo = data.tipo
    this.idCompany = data.idCompany
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.ramoNegocioService.getListImportExport(this.idCompany, this.tipo).subscribe(
      (response) => {
        if(response.isSuccess === true && response.isWarning === false){
          this.dataSource.data = response.data
        }
      }
    )
  }


  agregar(){
    const dialogRef1 = this.dialog.open(AgregarEditarComponent, {
      data: {
        titulo : "Agregar",
        id : 0,
        idCompany : this.idCompany,
        type : this.tipo
      },
    });
    dialogRef1.afterClosed().subscribe(
      () => {
        this.ramoNegocioService.getListImportExport(this.idCompany, this.tipo).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSource.data = response.data
            }
          }
        )
      }
    )
  }
  editar(id : number){
    const dialogRef2 = this.dialog.open(AgregarEditarComponent, {
      data: {
        titulo : "Editar",
        id : id,
        idCompany : this.idCompany,
        type : this.tipo
      },
    });
    dialogRef2.afterClosed().subscribe(
      () => {
        this.ramoNegocioService.getListImportExport(this.idCompany, this.tipo).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              this.dataSource.data = response.data
            }
          }
        )
      }
    )
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
        width: '30rem',
        heightAuto : true
      }).then((result) => {
        if (result.value) {
          this.ramoNegocioService.deleteImportExport(id).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'¡Eliminado!',
                  text : 'El registro se eliminó correctamente.',
                  icon : 'success',
                  width: '30rem',
                  heightAuto : true
                });
              }
            }
          )
        }
      });
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
