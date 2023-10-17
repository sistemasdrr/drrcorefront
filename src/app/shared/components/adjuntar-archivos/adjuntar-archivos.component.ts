import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Attachment } from 'app/models/attachment';
import { DialogData } from 'app/models/dialog-data';
import { Order } from 'app/models/order';
import { OrderService } from 'app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent {

  cupon: string = "";
  attachments : Attachment[] = []

  constructor(public dialogRef: MatDialogRef<AdjuntarArchivosComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private orderService : OrderService
  ) {
    console.log(dialogData);
    this.cupon = dialogData.data;
    this.attachments = this.orderService.getAttachmentsByCupon(this.cupon)
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
