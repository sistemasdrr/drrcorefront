import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Adjunto } from 'app/models/adjunto';
import { DialogData } from 'app/models/dialog-data';
import { PedidoService } from 'app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent {

  cupon: string = "";
  attachments : Adjunto[] = []

  constructor(public dialogRef: MatDialogRef<AdjuntarArchivosComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private pedidoService : PedidoService
  ) {
    console.log(dialogData);
    this.cupon = dialogData.data;
    this.attachments = this.pedidoService.getAttachmentsByCupon(this.cupon)
  }

  borrarAttachment(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar este registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title :'¡Eliminado!',
          text : 'El registro se elimino correctamente.',
          icon : 'success',
          width: '20rem',
          heightAuto : true
        });
        this.attachments = this.attachments.filter(x => x.id !== id)

      }
    });
  }

  cerrarDialog(){
    this.dialogRef.close()
  }
}
