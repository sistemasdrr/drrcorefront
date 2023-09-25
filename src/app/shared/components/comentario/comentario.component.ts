import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'app/models/dialog-data';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OrderService } from 'app/services/order.service';
import { Order } from 'app/models/order';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent {
  public Editor: any = ClassicEditor;

  cupon: string = "";
  order : Order[]

  constructor(
    public dialogRef: MatDialogRef<ComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private orderService : OrderService
  ) {
    console.log(dialogData);
    this.cupon = dialogData.data;
    this.order = this.orderService.getCommentByCupon(dialogData.data)
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
