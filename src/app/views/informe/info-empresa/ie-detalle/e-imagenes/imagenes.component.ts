import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyImages } from 'app/models/informes/empresa/imagenes';
import { ImagenesService } from 'app/services/informes/empresa/imagenes.service';
import { catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss'],
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
export class ImagenesComponent implements OnInit{

  id = 0
  idCompany = 0
  imgDesc1 = ""
  imgDesc2 = ""
  imgDesc3 = ""
  imgDesc4 = ""

  imgDescEng1 = ""
  imgDescEng2 = ""
  imgDescEng3 = ""
  imgDescEng4 = ""

  path1 = ""
  path2 = ""
  path3 = ""
  path4 = ""

  img1 = ""
  img2 = ""
  img3 = ""
  img4 = ""

  modeloActual : CompanyImages[] = []
  modeloModificado : CompanyImages[] = []

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

  constructor( private activatedRoute: ActivatedRoute, private imagenesService : ImagenesService) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idCompany = 0
    } else {
      this.idCompany = parseInt(id + '')
    }
    this.path1 = this.idCompany+'_1.png'
    this.path2 = this.idCompany+'_2.png'
    this.path3 = this.idCompany+'_3.png'
    this.path4 = this.idCompany+'_4.png'
  }
  ngOnInit(): void {

    if(this.idCompany !== 0){
      const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
      if(paginaDetalleEmpresa){
        paginaDetalleEmpresa.classList.remove('hide-loader');
      }
      this.imagenesService.getCompanyImgByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const companyImg = response.data
            if(companyImg){
              this.id = companyImg.id
              this.imgDesc1 = companyImg.imgDesc1
              this.imgDesc2 = companyImg.imgDesc2
              this.imgDesc3 = companyImg.imgDesc3
              this.imgDesc4 = companyImg.imgDesc4
              this.path1 = companyImg.path1
              this.path2 = companyImg.path2
              this.path3 = companyImg.path3
              this.path4 = companyImg.path4
              if(companyImg.traductions.length === 4){
                this.imgDescEng1 = companyImg.traductions[0].value
                this.imgDescEng2 = companyImg.traductions[1].value
                this.imgDescEng3 = companyImg.traductions[2].value
                this.imgDescEng4 = companyImg.traductions[3].value
              }
              this.armarModeloModificado()
              this.armarModeloActual()
            }
          }
        }
      ).add(
        () => {
          if(this.id !== 0 && this.id !== null){
            this.imagenesService.downloadImage(this.path1).pipe(
              catchError((error) => {
                console.error('Error al descargar la imagen:', error);
                return of(null); // Retorna un observable que emite null en caso de error
              }),
              map((response) => {
                if (response instanceof HttpResponse && response.ok) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    this.img1 = reader.result as string;
                  };
                  reader.readAsDataURL(response.body as Blob);
                } else {
                  console.error('Respuesta no válida:', response);
                }
              })
            ).subscribe();
            this.imagenesService.downloadImage(this.path2).pipe(
              catchError((error) => {
                console.error('Error al descargar la imagen:', error);
                return of(null); // Retorna un observable que emite null en caso de error
              }),
              map((response) => {
                if (response instanceof HttpResponse && response.ok) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    this.img2 = reader.result as string;
                  };
                  reader.readAsDataURL(response.body as Blob);
                } else {
                  console.error('Respuesta no válida:', response);
                }
              })
            ).subscribe();
            this.imagenesService.downloadImage(this.path3).pipe(
              catchError((error) => {
                console.error('Error al descargar la imagen:', error);
                return of(null); // Retorna un observable que emite null en caso de error
              }),
              map((response) => {
                if (response instanceof HttpResponse && response.ok) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    this.img3 = reader.result as string;
                  };
                  reader.readAsDataURL(response.body as Blob);
                } else {
                  console.error('Respuesta no válida:', response);
                }
              })
            ).subscribe();
            this.imagenesService.downloadImage(this.path4).pipe(
              catchError((error) => {
                console.error('Error al descargar la imagen:', error);
                return of(null); // Retorna un observable que emite null en caso de error
              }),
              map((response) => {
                if (response instanceof HttpResponse && response.ok) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    this.img4 = reader.result as string;
                  };
                  reader.readAsDataURL(response.body as Blob);
                } else {
                  console.error('Respuesta no válida:', response);
                }
              })
            ).subscribe()
            .add(
              () => {
                if(paginaDetalleEmpresa){
                  paginaDetalleEmpresa.classList.add('hide-loader');
                }
                this.armarModeloActual()
                this.armarModeloModificado()
              }
            );
          }else{
            if(paginaDetalleEmpresa){
              paginaDetalleEmpresa.classList.add('hide-loader');
            }
          }

        }
      )
    }
    this.armarModeloActual()
    this.armarModeloModificado()

  }
  armarModeloActual(){
    this.modeloActual[0] = {
      id : this.id,
      idCompany : this.idCompany,
      imgDesc1 : this.imgDesc1,
      path1 : this.path1,
      imgDesc2 : this.imgDesc2,
      path2 : this.path2,
      imgDesc3 : this.imgDesc3,
      path3 : this.path3,
      imgDesc4 : this.imgDesc4,
      path4 : this.path4,
      traductions : [
        {
          key : 'S_IMG_1',
          value : this.imgDescEng1
        },
        {
          key : 'S_IMG_2',
          value : this.imgDescEng2
        },
        {
          key : 'S_IMG_3',
          value : this.imgDescEng3
        },
        {
          key : 'S_IMG_4',
          value : this.imgDescEng4
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idCompany : this.idCompany,
      imgDesc1 : this.imgDesc1,
      path1 : this.path1,
      imgDesc2 : this.imgDesc2,
      path2 : this.path2,
      imgDesc3 : this.imgDesc3,
      path3 : this.path3,
      imgDesc4 : this.imgDesc4,
      path4 : this.path4,
      traductions : [
        {
          key : 'S_IMG_1',
          value : this.imgDescEng1
        },
        {
          key : 'S_IMG_2',
          value : this.imgDescEng2
        },
        {
          key : 'S_IMG_3',
          value : this.imgDescEng3
        },
        {
          key : 'S_IMG_4',
          value : this.imgDescEng4
        },
      ]
    }
  }

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
      }else if(card == 4){
        this.img4 = base64String;
        this.imgDesc4 = this.desc
        this.imgDescEng4 = this.descIng
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
      this.files[0] = new File([this.dataURItoBlob(this.img1)], this.idCompany + "_"+card+".png", { type: 'image/png' });
    }else if(card == 2){
      this.tituloSeleccion = "Imagén 2"
      this.desc = this.imgDesc2
      this.descIng = this.imgDescEng2
      this.files[0] = new File([this.dataURItoBlob(this.img2)], this.idCompany + "_"+card+".png", { type: 'image/png' });
    }else if(card == 3){
      this.tituloSeleccion = "Imagén 3"
      this.desc = this.imgDesc3
      this.descIng = this.imgDescEng3
      this.files[0] = new File([this.dataURItoBlob(this.img3)], this.idCompany + "_"+card+".png", { type: 'image/png' });
    }else if(card == 4){
      this.tituloSeleccion = "Imagén 4"
      this.desc = this.imgDesc4
      this.descIng = this.imgDescEng4
      this.files[0] = new File([this.dataURItoBlob(this.img4)], this.idCompany + "_"+card+".png", { type: 'image/png' });
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
    }else if(card == 4){
      this.img4 = ""
      this.imgDesc4 = ""
      this.imgDescEng4 = ""
    }
  }
  subirImagen(num: number) {
    // Crea un nuevo archivo a partir del Blob
    let imagen : any = null
    if(num === 1){
      imagen = new File([this.dataURItoBlob(this.img1)], this.idCompany + "_"+num+".png", { type: 'image/png' });
    }if(num === 2){
      imagen = new File([this.dataURItoBlob(this.img2)], this.idCompany + "_"+num+".png", { type: 'image/png' });
    }if(num === 3){
      imagen = new File([this.dataURItoBlob(this.img3)], this.idCompany + "_"+num+".png", { type: 'image/png' });
    }if(num === 4){
      imagen = new File([this.dataURItoBlob(this.img4)], this.idCompany + "_"+num+".png", { type: 'image/png' });
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
        const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.add('hide-loader');
          }
      }
    );
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
      this.armarModeloModificado()
      console.log(this.modeloModificado[0])
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
        const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
        if (result.value) {
          if(card === 1){
            this.imgDesc1 = desc
            this.imgDescEng1 = descIng
          }else if(card === 2){
            this.imgDesc2 = desc
            this.imgDescEng2 = descIng
          }else if(card === 3){
            this.imgDesc3 = desc
            this.imgDescEng3 = descIng
          }else if(card === 4){
            this.imgDesc4 = desc
            this.imgDescEng4 = descIng
          }

          this.agregarImagen(card)
          this.imagenesService.addCompanyImg(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const tabImages = document.getElementById('tab-imagenes') as HTMLElement | null;
                if (tabImages) {
                  tabImages.classList.add('tab-con-datos')
                }
                Swal.fire({
                  title: 'El registro se guardo correctamente.',
                  text: '',
                  icon: 'success',
                  width: '30rem',
                  heightAuto: true
                }).then(() => {
                  this.armarModeloActual()
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
            }else if(card === 4){
              this.imgDesc4 = desc
              this.imgDescEng4 = descIng
            }
            this.agregarImagen(card)
            this.armarModeloActual()
            this.armarModeloModificado()
            this.imagenesService.addCompanyImg(this.modeloModificado[0]).subscribe(
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
