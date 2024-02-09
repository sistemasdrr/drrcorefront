import { Component, Inject, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-calidad',
  templateUrl: './seleccionar-calidad.component.html',
  styleUrls: ['./seleccionar-calidad.component.scss'],
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
export class SeleccionarCalidadComponent implements OnInit {
  panelOpenState = false;

  constructor( public dialogRef: MatDialogRef<SeleccionarCalidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){

  }

  ngOnInit(): void {

  }

  volver(){
    this.dialogRef.close()
  }
  seleccionarCalidad(calidad : string){
    this.dialogRef.close({
      calidad : calidad
    })
  }
}
