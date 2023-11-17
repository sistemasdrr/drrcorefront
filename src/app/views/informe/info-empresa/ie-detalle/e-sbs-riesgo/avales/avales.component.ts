import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avales',
  templateUrl: './avales.component.html',
  styleUrls: ['./avales.component.scss']
})
export class AvalesComponent implements OnInit{

  constructor( public dialogRef: MatDialogRef<AvalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){

  }

  ngOnInit(): void {

  }

  volver(){
    this.dialogRef.close()
  }
}
