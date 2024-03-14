import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PersonPhoto } from 'app/models/informes/persona/imagenes-p';
import { ImagenesPService } from 'app/services/informes/persona/imagenes-p.service';
import { ImageEditorComponent } from 'app/views/informe/info-empresa/ie-detalle/e-imagenes/image-editor/image-editor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-imagenes',
  templateUrl: './p-imagenes.component.html',
  styleUrls: ['./p-imagenes.component.scss'],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class PImagenesComponent implements OnInit {
  id = -1
  idPerson = 0
  numImg = -1
  base64 = ""
  description = ""
  descriptionEng = ""
  printImg = false

  modeloNuevo : PersonPhoto[] = []
  modeloModificado : PersonPhoto[] = []

  listaFotos : PersonPhoto[] = []

files : any = []

  imgSeleccionadaCheck : boolean = false
  imgSeleccionada : string = ""

  mostrarImg(){
    this.imgSeleccionadaCheck = true
  }
  cardSeleccionada : number = 0

  tituloSeleccion : string = ""

  constructor(private activatedRoute: ActivatedRoute, private imagenesService : ImagenesPService,
    private dialog : MatDialog) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
  }
  ngOnInit(): void {

    if(this.idPerson !== 0){
      const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
      if(loader){
        loader.classList.remove('hide-loader');
      }
      this.imagenesService.getListPhoto(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            if(response.data.length > 0){
              this.listaFotos = response.data
              console.log(response.data)
            }
          }
        }
      ).add(
        () => {
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.add('hide-loader');
          }
        });
    }
  }
  armarModeloNuevo(){
    let num = 0
    if(this.listaFotos.length > 0){
      num = this.listaFotos[this.listaFotos.length-1].numImg +1
    }else{
      num = 1;
    }
    this.modeloNuevo[0] = {
      id : 0,
      idPerson : this.idPerson,
      numImg : num,
      base64 : this.base64,
      description : this.description,
      descriptionEng : this.descriptionEng,
      printImg : this.printImg,
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      numImg : this.numImg,
      base64 : this.base64,
      description : this.description,
      descriptionEng : this.descriptionEng,
      printImg : this.printImg,
    }
  }
  onSelect(event : any) {
    this.imgSeleccionadaCheck = false

    console.log(...event.addedFiles)
  }
  onPaste(event: any) {
    if(this.id !== 0){
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (const item of items) {
        if (item.type.indexOf('image') === 0) {
          const blob = item.getAsFile();

          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result as string;
            this.base64 = base64String;

          };
          reader.readAsDataURL(blob);
        }
      }
    }
  }
  eliminarFoto(id : number){
    Swal.fire({
      title: '¿Está seguro de eliminar esta imagen?',
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
        this.imagenesService.deletePhoto(id).subscribe(
          (response) => {
            if(response.isSuccess === true && response.isWarning === false){
              Swal.fire({
                title :'¡Eliminado!',
                text : 'El registro se eliminó correctamente.',
                icon : 'success',
                width: '20rem',
                heightAuto : true
              }).then(() => {
                this.listaFotos = this.listaFotos.filter(x => x.id !== id)
              })
            }
          }
        )
      }
    })
  }


  seleccionarCard(id : number){
    const card = this.listaFotos.filter(x => x.id === id)[0]
    console.log(card)
    this.id = card.id
    this.idPerson = card.idPerson
    this.numImg = card.numImg
    this.base64 = card.base64
    this.description = card.description
    this.descriptionEng = card.descriptionEng
    this.printImg = card.printImg
  }
  seleccionarImagen() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.base64 = base64String;
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  pegarImagen() {
    const clipboardData = navigator.clipboard;
    if (!clipboardData) {
      console.log("El navegador no admite el acceso al portapapeles.");
      return;
    }

    clipboardData.read()
      .then(data => {
        for (const item of data) {
          for (const type of item.types) {
            if (type.startsWith('image/')) {
              const mimeType = type.split('/')[1];
              item.getType(type).then(blob => {
                const reader = new FileReader();
                reader.onload = () => {
                  const base64String = reader.result as string;
                  this.base64 = base64String;
                };
                reader.readAsDataURL(blob);
              }).catch(error => {
                console.error("Error al obtener la imagen del portapapeles:", error);
              });
              return;
            }
          }
        }
        Swal.fire({
          title: 'No se encontraron imágenes en el portapapeles',
          icon : 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
          width: '20rem',
          heightAuto: true
        })
      })
      .catch(err => {
        console.error("Error al leer el portapapeles:", err);
      });
  }

  editarImagen(){
    const dialogRef = this.dialog.open(ImageEditorComponent, {
      data: {
        image : this.base64.includes('data:image/') === true ? this.base64 : 'data:image/png;base64,'+this.base64
      },
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data){
          this.base64 = data.base64
        }
      }
    )
  }
  borrarImagen(card : number){
  }

  nuevo(){
    this.id = 0
    this.numImg = 0
    this.base64 = ""
    this.description = ""
    this.descriptionEng = ""
    this.printImg = false
  }
  guardar(id : number){


    if(this.id === 0){
      this.armarModeloNuevo()
      console.log(this.modeloNuevo[0])
      Swal.fire({
        title: '¿Está seguro de guardar este registro?',
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
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.imagenesService.addPhoto(this.modeloNuevo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'',
                  text : 'El registro se agregó correctamente.',
                  icon : 'success',
                  width: '30rem',
                  heightAuto : true
                })
              }
            }
          ).add(
            () => {
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
              this.imagenesService.getListPhoto(this.idPerson).subscribe(
                (response) =>{
                  if(response.isSuccess === true && response.isWarning === false){
                    this.listaFotos = response.data
                  }
                }
              )
              this.id = -1
              this.numImg = 0
              this.base64 = ""
              this.description = ""
              this.descriptionEng = ""
              this.printImg = false
            }
          )
        }
      });
    }else{
      this.armarModeloModificado()
      console.log(this.modeloModificado[0])
      Swal.fire({
        title: '¿Está seguro de modificar este registro?',
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
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.imagenesService.addPhoto(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                Swal.fire({
                  title :'',
                  text : 'El registro se guardo correctamente.',
                  icon : 'success',
                  width: '30rem',
                  heightAuto : true
                })
              }
            }
          ).add(
            () => {
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
              this.imagenesService.getListPhoto(this.idPerson).subscribe(
                (response) =>{
                  if(response.isSuccess === true && response.isWarning === false){
                    this.listaFotos = response.data
                  }
                }
              )
              this.id = -1
              this.numImg = 0
              this.base64 = ""
              this.description = ""
              this.descriptionEng = ""
              this.printImg = false
            }
          )
          }
        })
    }
  }
}
