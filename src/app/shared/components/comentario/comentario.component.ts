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

  id = 0
  cupon: string = "";
  comentario = ""

  constructor(
    public dialogRef: MatDialogRef<ComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pedidoService : PedidoService
  ) {
    if(data){
      this.id = data.id
      this.cupon = data.cupon
      this.comentario = data.comentario
    }
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
  guardar(){
    this.dialogRef.close(
      {
      comentario : this.comentario
      }
    )
  }
}
