import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CropperComponent, ImageCropperResult } from 'angular-cropperjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit, AfterViewInit{

  public base64 = ""
  public alturaOr = ""
  public baseOr = ""
  public pesoOr = ""
  public alturaRe = ""
  public baseRe = ""
  public pesoRe = ""
  public config = {
    ImageName: 'Some image',
    AspectRatios: ["4:3", "16:9"],

    ImageUrl: '',
    ImageType: 'image/png'
  }
  zoom = 1

@ViewChild('cropper') public angularCropper: CropperComponent;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialog : MatDialog,
  public dialogRef: MatDialogRef<ImageEditorComponent>,){
    this.angularCropper = new CropperComponent
    if(data.image !== ""){
      this.base64 = data.image
      this.config.ImageUrl = this.base64;
    }
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.angularCropper.ready.subscribe(() => {
      // El componente de Angular Cropper está totalmente cargado aquí
      console.log('Angular Cropper cargado completamente');

      // Obtener los datos del canvas
      const canvasData = this.angularCropper.cropper.getCanvasData();
      if (canvasData) {
        this.saveChanges()
        this.alturaOr = canvasData.naturalHeight.toFixed(0);
        this.baseOr = canvasData.naturalWidth.toFixed(0);
        this.pesoOr = (this.calculateBase64Size(this.base64)/1024).toFixed(1) + "Kb"
      }
    });
  }

  public imagenResultanteUrl: string = '';

  zoomIn() {
    console.log(this.angularCropper.cropper.getCanvasData())
    this.angularCropper.cropper.zoom(0.1);
  }
  zoomOut() {
    this.angularCropper.cropper.zoom(-0.1);
  }
  rotateRight(){
    this.angularCropper.cropper.rotate(90)
  }
  rotateLeft(){
    this.angularCropper.cropper.rotate(-90)
  }
  resetChanges() {
    this.angularCropper.cropper.reset()
  }
  aspectRatio(ratio : number){
    this.angularCropper.cropper.setAspectRatio(ratio)
  }
  ratioPersonalizado(){
    Swal.fire({
      title: 'Base x Altura',

      html: `
        <input type="number" id="base" placeholder="Base" class="swal2-input" min="0">
        <input type="number" id="altura" placeholder="Altura" class="swal2-input" min="0">
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      width: '20rem',
      heightAuto: true
    }).then((result) => {
      if (result.isConfirmed) {
        const baseInput = document.getElementById('base') as HTMLInputElement;
        const alturaInput = document.getElementById('altura') as HTMLInputElement;

        const base = parseInt(baseInput.value);
        const altura = parseInt(alturaInput.value);

        this.angularCropper.cropper.setAspectRatio(base/altura)
        if (!isNaN(base) && !isNaN(altura)) {
          console.log('Base:', base);
          console.log('Altura:', altura);
        } else {
          Swal.fire('Error', 'Por favor ingresa valores numéricos válidos', 'error');
        }
      }
    });
  }

  getBase64() {
    this.angularCropper.cropper.getCropBoxData()
    console.log(this.angularCropper.image)
    const anys = this.angularCropper.image
    console.log(anys)
  }
  saveChanges() {
    const dataUrl = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    const result: ImageCropperResult = {
      imageData: this.angularCropper.cropper.getImageData(),
      cropData: this.angularCropper.cropper.getCropBoxData(),
      dataUrl: dataUrl
    };
    this.cropImg(result);

  }

  cropImg(e: ImageCropperResult) {
    console.log(e);
    if (e.dataUrl !== undefined) {
      this.imagenResultanteUrl = e.dataUrl;
      const img = new Image();
      img.src = e.dataUrl;
      img.onload = () => {
        const altura = img.height;
        const base = img.width;
        this.alturaRe = altura.toFixed(0);
        this.baseRe = base.toFixed(0);
        this.pesoRe = (this.calculateBase64Size(img.src)/1024).toFixed(1) + "Kb"
      };
    }
  }
   calculateBase64Size(base64String : string) {
    const padding = (base64String.endsWith('==') ? 2 : (base64String.endsWith('=') ? 1 : 0));
    const length = base64String.length;
    const size = (length * 0.75) - padding;
    return size;
  }
  guardar(){
    Swal.fire({
      title: '¿Está seguro de modificar la imagen?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText : 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '30rem',
      heightAuto : true
    }).then((result) => {
      if (result.value) {
        console.log(this.imagenResultanteUrl)
        this.dialogRef.close({
          base64 : this.imagenResultanteUrl
        })
      }
    })
  }
  salir(){
    this.dialogRef.close()
  }



}

