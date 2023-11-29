import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

@Component({
  selector: 'app-p-imagenes',
  templateUrl: './p-imagenes.component.html',
  styleUrls: ['./p-imagenes.component.scss']
})
export class PImagenesComponent {
  constructor(
    private dialog : MatDialog
  ){
  }
  files: File[] = []
  img1 = "assets/images/image-gallery/5.jpg"
  img2 = "assets/images/image-gallery/5.jpg"
  img3 = "assets/images/image-gallery/5.jpg"
  img4 = "assets/images/image-gallery/5.jpg"

  desc : string = ""
  descIng : string = ""

  imgSeleccionadaCheck : boolean = false
  imgSeleccionada : string = ""

  cardSeleccionada : number = 0

  tituloSeleccion : string = ""

  //IMGS
  imgDesc1 : string = ""
  imgDesc2 : string = ""
  imgDesc3 : string = ""
  imgDesc4 : string = ""

  imgDescIng1 : string = ""
  imgDescIng2 : string = ""
  imgDescIng3 : string = ""
  imgDescIng4 : string = ""

  onSelect(event : any) {
    this.files = []
    this.imgSeleccionadaCheck = false

    this.files.push(...event.addedFiles);
    console.log(...event.addedFiles)
    // for (const file of this.files) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //   const base64String = event.target?.result as string;
    //     console.log('Base64 de la imagen:', base64String);
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  onRemove(event : any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  agregarComentario(titulo1 : string, titulo2 : string, subtitulo : string, empresa : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo1 : titulo1,
        titulo2 : titulo2,
        subtitulo : subtitulo,
        empresa: empresa,
        },
      });
  }
  onPaste(event: any) {
    this.files = []
    this.imgSeleccionadaCheck = false
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }
    this.files.push(blob);
    // for (const file of this.files) {
    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     const base64String = event.target?.result as string;
    //     console.log('Base64 de la imagen:', base64String);
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  agregarImagen(card : number){
    const reader = new FileReader();
    reader.onload = (event) => {
    const base64String = event.target?.result as string;
      console.log('Base64 de la imagen:', base64String);
      if(card == 1){
        this.img1 = base64String;
        this.imgDesc1 = this.desc
        this.imgDescIng1 = this.descIng
      }else if(card == 2){
        this.img2 = base64String;
        this.imgDesc2 = this.desc
        this.imgDescIng2 = this.descIng
      }else if(card == 3){
        this.img3 = base64String;
        this.imgDesc3 = this.desc
        this.imgDescIng3 = this.descIng
      }else if(card == 4){
        this.img4 = base64String;
        this.imgDesc4 = this.desc
        this.imgDescIng4 = this.descIng
      }
      this.cardSeleccionada = 0
      this.files = []
      this.tituloSeleccion = ""
      this.desc = ""
      this.descIng = ""
    };
    reader.readAsDataURL(this.files[0]);
  }

  seleccionarCard(card : number){
    this.cardSeleccionada = card
    this.files = []
    this.imgSeleccionadaCheck = true
    if(card == 1){
      this.tituloSeleccion = "Imagén 1"
      this.imgSeleccionada = this.img1
      this.desc = this.imgDesc1
      this.descIng = this.imgDescIng1
    }else if(card == 2){
      this.tituloSeleccion = "Imagén 2"
      this.imgSeleccionada = this.img2
      this.desc = this.imgDesc2
      this.descIng = this.imgDescIng2
    }else if(card == 3){
      this.tituloSeleccion = "Imagén 3"
      this.imgSeleccionada = this.img3
      this.desc = this.imgDesc3
      this.descIng = this.imgDescIng3
    }else if(card == 4){
      this.tituloSeleccion = "Imagén 4"
      this.imgSeleccionada = this.img4
      this.desc = this.imgDesc4
      this.descIng = this.imgDescIng4
    }
  }
}
