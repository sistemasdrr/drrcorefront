import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent {

  byt : string | ArrayBuffer | null = ""
  constructor(
    private dialog : MatDialog
  ){
  }
  files: File[] = [];
  img1 = ""
  img2 = ""
  img3 = ""
  descripcion1 = ""
  descripcion2 = ""
  descripcion3 = ""
  onSelect(event : any) {
    console.log(event);
    this.files.push(...event.addedFiles);
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

  async pasteFromClipboard() {
    if (!navigator.clipboard) {
      console.log('El navegador no soporta la API del portapapeles');
      return;
    }
    const text = await navigator.clipboard.readText();
    this.img1 = text;
    console.log(text)
  }
}
