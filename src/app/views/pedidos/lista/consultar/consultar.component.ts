import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit{

  dateQuery:Date
  ticket:any;
  constructor(public dialogRef: MatDialogRef<ConsultarComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    if(data){
    this.ticket=data.ticket;
    }
    this.dateQuery=new Date();
  }
  ngOnInit(): void {
     console.log(this.data);

  }

  guardar(){

  }
  salir(){
    this.dialogRef.close()
  }
}
