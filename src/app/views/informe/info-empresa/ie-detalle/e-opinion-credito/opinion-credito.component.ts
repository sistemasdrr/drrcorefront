import { OpinionCreditoService } from './../../../../../services/informes/empresa/opinion-credito.service';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { OpinionCredito } from 'app/models/informes/empresa/opinion-credito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opinion-credito',
  templateUrl: './opinion-credito.component.html',
  styleUrls: ['./opinion-credito.component.scss'],
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
export class OpinionCreditoComponent implements OnInit {

  id = 0
  idCompany = 0
  creditRequest = false
  consultedCredit = ""
  consultedCreditEng = ""
  suggestedCredit = ""
  suggestedCreditEng = ""
  currentCommentary = ""
  currentCommentaryEng = ""
  previousCommentary = ""

  modeloNuevo : OpinionCredito[] = []
  modeloModificado : OpinionCredito[] = []

  constructor(private opinionCreditoService : OpinionCreditoService ,private dialog : MatDialog, private activatedRoute : ActivatedRoute){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id?.includes('nuevo')) {
        this.idCompany = 0
      } else {
        this.idCompany = parseInt(id + '')
      }
  }

  ngOnInit(): void {
    const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
    if(paginaDetalleEmpresa){
      paginaDetalleEmpresa.classList.remove('hide-loader');
    }
    if(this.idCompany !== 0){
      this.opinionCreditoService.getCreditOpinionByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const opinionCredito = response.data
            if(opinionCredito){
              this.id = opinionCredito.id
              this.creditRequest = opinionCredito.creditRequest
              this.consultedCredit = opinionCredito.consultedCredit
              this.suggestedCredit = opinionCredito.suggestedCredit
              this.currentCommentary = opinionCredito.currentCommentary
              this.previousCommentary = opinionCredito.previousCommentary
              if(opinionCredito.traductions.length === 3){
                console.log(opinionCredito.traductions)
                this.consultedCreditEng = opinionCredito.traductions[0].value
                this.suggestedCreditEng = opinionCredito.traductions[1].value
                this.currentCommentaryEng = opinionCredito.traductions[2].value
              }
            }
            this.armarModeloNuevo()
            this.armarModeloModificado()
          }
        }
      ).add(
        () => {
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.add('hide-loader');
          }
        }
      )
    }else{
      if(paginaDetalleEmpresa){
        paginaDetalleEmpresa.classList.add('hide-loader');
      }
    }
  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      idCompany : this.idCompany,
      creditRequest : this.creditRequest,
      consultedCredit : this.consultedCredit,
      suggestedCredit : this.suggestedCredit,
      currentCommentary : this.currentCommentary,
      previousCommentary : this.previousCommentary,
      traductions : [
        {
          key : 'S_O_QUERYCREDIT',
          value : this.consultedCreditEng
        },
        {
          key : 'S_O_SUGCREDIT',
          value : this.suggestedCreditEng
        },
        {
          key : 'L_O_COMENTARY',
          value : this.currentCommentaryEng
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idCompany : this.idCompany,
      creditRequest : this.creditRequest,
      consultedCredit : this.consultedCredit,
      suggestedCredit : this.suggestedCredit,
      currentCommentary : this.currentCommentary,
      previousCommentary : this.previousCommentary,
      traductions : [
        {
          key : 'S_O_QUERYCREDIT',
          value : this.consultedCreditEng
        },
        {
          key : 'S_O_SUGCREDIT',
          value : this.suggestedCreditEng
        },
        {
          key : 'L_O_COMENTARY',
          value : this.currentCommentaryEng
        },
      ]
    }
  }

  agregarTraduccion(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'input',
        comentario_es : comentario_es,
        comentario_en : comentario_en
        },
      });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'creditoConsultado':
          this.consultedCredit = data.comentario_es;
          this.consultedCreditEng = data.comentario_en;
          break
          case 'creditoSugerido':
          this.suggestedCredit = data.comentario_es;
          this.suggestedCreditEng = data.comentario_en;
          break
        }
      }
    });
  }
  agregarComentario(titulo : string, subtitulo : string, comentario_es : string, comentario_en : string, input : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
      data: {
        titulo : titulo,
        subtitulo : subtitulo,
        tipo : 'textarea',
        comentario_es : comentario_es,
        comentario_en : comentario_en
        },
      });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data)
        switch(input){
          case 'comentarioAnotado':
          this.currentCommentary = data.comentario_es;
          this.currentCommentaryEng = data.comentario_en;
          break

        }
      }
    });
  }
  titulo = 'Comentario - Traduccion'
  tituloCreditoConsultado = 'Crédito Consultado'
  tituloCreditoSugerido = 'Crédito Sugerido'
  tituloComentario = 'Comentario Acorde a lo Anotado '

  guardar(){
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
          this.opinionCreditoService.addCreditOpinion(this.modeloNuevo[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
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
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
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
          this.opinionCreditoService.addCreditOpinion(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
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
              if(paginaDetalleEmpresa){
                paginaDetalleEmpresa.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }
  }
}
