import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'app/models/dialog-data';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PedidoService } from 'app/services/pedido.service';
import { Pedido } from 'app/models/pedidos/pedido';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent {
  public Editor: any = ClassicEditor;

  cupon: string = "";
  order : Pedido[]

  constructor(
    public dialogRef: MatDialogRef<ComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private pedidoService : PedidoService
  ) {
    console.log(dialogData);
    this.cupon = dialogData.data;
    this.order = this.pedidoService.getCommentByCupon(dialogData.data)
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
