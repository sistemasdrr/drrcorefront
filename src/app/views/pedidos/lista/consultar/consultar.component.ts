import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ConsultarComponent>, @Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(): void {

  }

  guardar(){
    
  }
  salir(){
    this.dialogRef.close()
  }
}
