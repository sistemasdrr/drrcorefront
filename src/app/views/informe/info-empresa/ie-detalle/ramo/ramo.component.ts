import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RamoActividadDialogComponent } from '@shared/components/ramo-actividad/ramo-actividad.component';

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.scss']
})
export class RamoComponent {

  constructor(  private dialog : MatDialog){}
  ramoActividadDialog() {
    const dialogRef = this.dialog.open(RamoActividadDialogComponent, {
    data: {
    },
  });
  }
}
