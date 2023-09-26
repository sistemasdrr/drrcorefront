import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ImpoExpoDialogData } from 'app/models/dialog-data';
import { ImpoExpoService } from 'app/services/impo-expo.service';
import { AgregarEditarComponent } from './agregar-editar/agregar-editar.component';

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
export class CuadroImpoExpoComponent{
  codigoSeleccionado : string = ""

  columnsToDisplay = ['año', 'monto', 'accion'];

  dataSource: MatTableDataSource<ImpoExpoData>;
  botonDeshabilitado: boolean = true;
  codigoAbonado : string = ""

  @Output()
  eventSelectAbonado = new EventEmitter<string>();

  titulo : string
  codEmpresa : string

  constructor(private dialog : MatDialog,
    public dialogRef: MatDialogRef<CuadroImpoExpoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImpoExpoDialogData,
    private impoExpoService : ImpoExpoService) {
    this.titulo = data.titulo
    this.codEmpresa = data.codigoEmpresa
    if(this.titulo == "Importaciones"){
      this.dataSource = new MatTableDataSource(this.impoExpoService.getImpoData())
    }else{
      this.dataSource = new MatTableDataSource(this.impoExpoService.getExpoData())
    }

  }

  realizarEnvioCodigo(codigo : string) {
    this.codigoAbonado = codigo
    this.dialogRef.close({ codigoAbonado: this.codigoAbonado });
  }

  agregar(){
    const dialogRef1 = this.dialog.open(AgregarEditarComponent, {
      data: {
        accion : "AGREGAR",
      },
    });
    dialogRef1.afterClosed().subscribe((ImpoExpoData : ImpoExpoData) => {
      if (ImpoExpoData) {
        const nuevoElemento: ImpoExpoData = {
          id : "",
          anio: ImpoExpoData.anio,
          monto: ImpoExpoData.monto,
        };
        this.dataSource.data.push(nuevoElemento);
        this.dataSource._updateChangeSubscription();
      }
    });
  }
  editar(id : string, año : string, monto : string){
    const dialogRef2 = this.dialog.open(AgregarEditarComponent, {
      data: {
        accion : "EDITAR",
        anio : año,
        monto : monto
      },
    });
    dialogRef2.afterClosed().subscribe((ImpoExpoData : ImpoExpoData) => {
      if (ImpoExpoData) {
        const elementoAEditar = this.dataSource.data.find(item => item.id === id);

        if (elementoAEditar) {
          elementoAEditar.anio = ImpoExpoData.anio;
          elementoAEditar.monto = ImpoExpoData.monto;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }
  eliminar(año : string, monto : string){
    for (let i = 0; i < this.dataSource.data.length; i++) {
      const elemento = this.dataSource.data[i];
      if (elemento.anio === año && elemento.monto === monto) {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
        break;
      }
    }
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
