import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Domicilio } from 'app/models/informes/persona/domicilio';
import { DomicilioService } from 'app/services/informes/persona/domicilio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-domicilio',
  templateUrl: './p-domicilio.component.html',
  styleUrls: ['./p-domicilio.component.scss'],
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
export class PDomicilioComponent implements OnInit {

  id = 0
  idPerson = 0
  ownHome : boolean | null = false
  value = ""
  valueEng = ""
  homeCommentary = ""
  homeCommentaryEng = ""

  modeloNuevo : Domicilio[] = []
  modeloModificado : Domicilio[] = []

  constructor(public dialog: MatDialog, private domicilioService : DomicilioService, private activatedRoute: ActivatedRoute, private router : Router) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
    console.log(this.id)
  }

  ngOnInit(): void {
    const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
    if(loader){
      loader.classList.remove('hide-loader');
    }
    if(this.idPerson > 0){
      this.domicilioService.getDomicilio(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const domicilio = response.data
            if(domicilio){
              this.id = domicilio.id
              this.ownHome = domicilio.ownHome
              this.value = domicilio.value
              this.homeCommentary = domicilio.homeCommentary
              if(domicilio.traductions.length > 0){
                this.valueEng = domicilio.traductions[0].value
                this.homeCommentaryEng = domicilio.traductions[1].value
              }
            }
          }
        }
      ).add(
        () => {
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.add('hide-loader');
          }
        }
      )
    }else{
      const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
      if(loader){
        loader.classList.add('hide-loader');
      }
    }

  }

  armarModeloNuevo(){
    this.modeloNuevo[0] = {
      id : this.id,
      idPerson : this.idPerson,
      ownHome : this.ownHome,
      value : this.value,
      homeCommentary : this.homeCommentary,
      traductions : [
        {
          key : "S_D_VALUE",
          value : this.valueEng,
        },
        {
          key : "L_D_RESIDENCE",
          value : this.homeCommentaryEng,
        },
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      ownHome : this.ownHome,
      value : this.value,
      homeCommentary : this.homeCommentary,
      traductions : [
        {
          key : "S_D_VALUE",
          value : this.valueEng,
        },
        {
          key : "L_D_RESIDENCE",
          value : this.homeCommentaryEng,
        },
      ]
    }
  }
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
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.domicilioService.addDomicilio(this.modeloNuevo[0]).subscribe(
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
              if(loader){
                loader.classList.add('hide-loader');
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
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.domicilioService.addDomicilio(this.modeloModificado[0]).subscribe(
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
              if(loader){
                loader.classList.add('hide-loader');
              }
            }
          )
        }
      });
    }
  }


}
