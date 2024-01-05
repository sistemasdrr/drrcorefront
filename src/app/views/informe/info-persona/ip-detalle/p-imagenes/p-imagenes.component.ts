import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { PersonImages } from 'app/models/informes/persona/imagenes-p';
import { ImagenesPService } from 'app/services/informes/persona/imagenes-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-imagenes',
  templateUrl: './p-imagenes.component.html',
  styleUrls: ['./p-imagenes.component.scss']
})
export class PImagenesComponent implements OnInit {

  id = 0
  idPerson = 0
  imgDesc1 = ""
  imgDesc2 = ""
  imgDesc3 = ""

  imgDescEng1 = ""
  imgDescEng2 = ""
  imgDescEng3 = ""

  path1 = ""
  path2 = ""
  path3 = ""

  img1 = ""
  img2 = ""
  img3 = ""

  modeloNuevo : PersonImages[] = []
  modeloModificado : PersonImages[] = []

  files: File[] = []

  desc : string = ""
  descIng : string = ""

  imgSeleccionadaCheck : boolean = false
  imgSeleccionada : string = ""

  mostrarImg(){
    this.files = []
    this.imgSeleccionadaCheck = true
  }
  cardSeleccionada : number = 0

  tituloSeleccion : string = ""

  constructor(private activatedRoute: ActivatedRoute, private imagenesService : ImagenesPService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
    this.path1 = this.idPerson+'_1_P.png'
    this.path2 = this.idPerson+'_2_P.png'
    this.path3 = this.idPerson+'_3_P.png'
  }
  ngOnInit(): void {

    if(this.idPerson !== 0){
      const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
      if(loader){
        loader.classList.remove('hide-loader');
      }
      this.imagenesService.getPersonImgById(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            console.log(response)
            const companyImg = response.data
            if(companyImg){
              this.id = companyImg.id
              this.imgDesc1 = companyImg.imgDesc1
              this.imgDesc2 = companyImg.imgDesc2
              this.imgDesc3 = companyImg.imgDesc3
              this.path1 = companyImg.path1
              this.path2 = companyImg.path2
              this.path3 = companyImg.path3
              if(companyImg.traductions.length === 4){
                this.imgDescEng1 = companyImg.traductions[0].value
                this.imgDescEng2 = companyImg.traductions[1].value
                this.imgDescEng3 = companyImg.traductions[2].value
              }
              this.armarModeloModificado()
              this.armarModeloNuevo()
            }
          }
        }
      ).add(
        () => {
          if(this.id !== 0){
              this.imagenesService.downloadImage(this.path1).subscribe(
                (response) => {
                  if (response instanceof HttpResponse && response.ok) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      this.img1 = reader.result as string;
                    };
                    reader.readAsDataURL(response.body as Blob);
                  }else{
                    console.log("1")
                  }
                }
              );
              this.imagenesService.downloadImage(this.path2).subscribe(
                (response) => {
                  if (response instanceof HttpResponse && response.ok) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      this.img2 = reader.result as string;
                    };
                    reader.readAsDataURL(response.body as Blob);
                  }else{
                    console.log("2")
                  }
                }
              );
              this.imagenesService.downloadImage(this.path3).subscribe(
                (response) => {
                  if (response instanceof HttpResponse && response.ok) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      this.img3 = reader.result as string;
                    };
                    reader.readAsDataURL(response.body as Blob);
                  }else{
                    console.log("3a")
                  }
                }
              ).add(
                () => {
                  if(loader){
                    loader.classList.add('hide-loader');
                  }
                }
              );
            }
        }
      );
    }
  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      idPerson : this.idPerson,
      imgDesc1 : this.imgDesc1,
      path1 : this.path1,
      imgDesc2 : this.imgDesc2,
      path2 : this.path2,
      imgDesc3 : this.imgDesc3,
      path3 : this.path3,
      traductions : [
        {
          key : 'S_IP_IMG1',
          value : this.imgDescEng1
        },
        {
          key : 'S_IP_IMG2',
          value : this.imgDescEng2
        },
        {
          key : 'S_IP_IMG3',
          value : this.imgDescEng3
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      imgDesc1 : this.imgDesc1,
      path1 : this.path1,
      imgDesc2 : this.imgDesc2,
      path2 : this.path2,
      imgDesc3 : this.imgDesc3,
      path3 : this.path3,
      traductions : [
        {
          key : 'S_IP_IMG1',
          value : this.imgDescEng1
        },
        {
          key : 'S_IP_IMG2',
          value : this.imgDescEng2
        },
        {
          key : 'S_IP_IMG3',
          value : this.imgDescEng3
        },
      ]
    }
  }
  onSelect(event : any) {
    this.files = []
    this.imgSeleccionadaCheck = false

    this.files.push(...event.addedFiles);
    console.log(...event.addedFiles)
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
  }
  agregarImagen(card : number){
    const reader = new FileReader();
    reader.onload = (event) => {
    const base64String = event.target?.result as string;
    this.imgSeleccionada = base64String
      console.log('Base64 de la imagen:', base64String);
      if(card == 1){
        this.img1 = base64String;
        this.imgDesc1 = this.desc
        this.imgDescEng1 = this.descIng
      }else if(card == 2){
        this.img2 = base64String;
        this.imgDesc2 = this.desc
        this.imgDescEng2 = this.descIng
      }else if(card == 3){
        this.img3 = base64String;
        this.imgDesc3 = this.desc
        this.imgDescEng3 = this.descIng
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
      this.desc = this.imgDesc1
      this.descIng = this.imgDescEng1
      this.files[0] = new File([this.dataURItoBlob(this.img1)], this.idPerson + "_"+card+".png", { type: 'image/png' });
    }else if(card == 2){
      this.tituloSeleccion = "Imagén 2"
      this.desc = this.imgDesc2
      this.descIng = this.imgDescEng2
      this.files[0] = new File([this.dataURItoBlob(this.img2)], this.idPerson + "_"+card+".png", { type: 'image/png' });
    }else if(card == 3){
      this.tituloSeleccion = "Imagén 3"
      this.desc = this.imgDesc3
      this.descIng = this.imgDescEng3
      this.files[0] = new File([this.dataURItoBlob(this.img3)], this.idPerson + "_"+card+".png", { type: 'image/png' });
    }
  }

  borrarImagen(card : number){
    if(card == 1){
      this.img1 = ""
      this.imgDesc1 = ""
      this.imgDescEng1 = ""
    }else if(card == 2){
      this.img2 = ""
      this.imgDesc2 = ""
      this.imgDescEng2 = ""
    }else if(card == 3){
      this.img3 = ""
      this.imgDesc3 = ""
      this.imgDescEng3 = ""
    }
  }
  subirImagen(num: number) {
    // Crea un nuevo archivo a partir del Blob
    let imagen : any = null
    if(num === 1){
      imagen = new File([this.dataURItoBlob(this.img1)], this.idPerson + "_"+num+"_P.png", { type: 'image/png' });
    }if(num === 2){
      imagen = new File([this.dataURItoBlob(this.img2)], this.idPerson + "_"+num+"_P.png", { type: 'image/png' });
    }if(num === 3){
      imagen = new File([this.dataURItoBlob(this.img3)], this.idPerson + "_"+num+"_P.png", { type: 'image/png' });
    }
    const formData = new FormData();
    formData.append('request', imagen);

    this.imagenesService.uploadImages(formData).subscribe(
      (response) => {
        if (response.isSuccess === true && response.isWarning === false) {
          Swal.fire({
            title: '¡Se guardaron los datos con éxito!',
            text: '',
            icon: 'success',
            width: '40rem',
            heightAuto: true
          }).then(() => {
          });
        }
      }
    ).add(
      () => {
        const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.add('hide-loader');
          }
      }
    );
  }
  subirImagenAux(){
    let imagen : any = null
    imagen = new File([this.dataURItoBlob('')], this.idPerson + "_1_P.png", { type: 'image/png' });
    const formData = new FormData();
    formData.append('request', imagen);
    this.imagenesService.uploadImages(formData).subscribe(
      (response) => {
        if (response.isSuccess === true && response.isWarning === false) {
        }
      }).add(
        () => {
          imagen = new File([this.dataURItoBlob('')], this.idPerson + "_2_P.png", { type: 'image/png' });
          const formData = new FormData();
          formData.append('request', imagen);
          this.imagenesService.uploadImages(formData).subscribe(
            (response) => {
              if (response.isSuccess === true && response.isWarning === false) {
              }
            }).add(
              () => {
                imagen = new File([this.dataURItoBlob('')], this.idPerson + "_3_P.png", { type: 'image/png' });
                const formData = new FormData();
                formData.append('request', imagen);
                this.imagenesService.uploadImages(formData).subscribe(
                  (response) => {
                    if (response.isSuccess === true && response.isWarning === false) {
                    }
            });
          }
        )
      }
    )
  }

  dataURItoBlob(dataURI: string): Blob {
    if(dataURI !== "" && dataURI !== null){
      const byteString = atob(dataURI.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    }else{
      return new Blob([])
    }
  }
  guardar(card : number, desc : string, descIng : string){
    console.log(card)
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
          this.imagenesService.addPersonImg(this.modeloNuevo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
              this.subirImagenAux()
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.armarModeloNuevo()
                  this.armarModeloModificado()
                })
                this.id = response.data
              }
            }
          ).add(
            () => {
              this.subirImagen(card)
            }
          )
        }
      });
    }else{
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
            if(card === 1){
              this.imgDesc1 = desc
              this.imgDescEng1 = descIng
            }else if(card === 2){
              this.imgDesc2 = desc
              this.imgDescEng2 = descIng
            }else if(card === 3){
              this.imgDesc3 = desc
              this.imgDescEng3 = descIng
            }
            this.agregarImagen(card)
            this.armarModeloModificado()
            this.imagenesService.addPersonImg(this.modeloModificado[0]).subscribe(
              (response) => {
                if(response.isSuccess === true && response.isWarning === false){
                }
              }
            ).add(
              () => {
                this.subirImagen(card)
              }
            )
          }
        })
    }
  }
}
