import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { InformacionGeneral } from 'app/models/informes/empresa/informacion-general';
import { InformacionGeneralService } from 'app/services/informes/empresa/informacion-general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.scss'],
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
export class InformacionGeneralComponent implements OnInit {
  informacionGeneral = "";
  informacionIngGeneral = "";

  id = 0
  idCompany = 0
  generalInfo = ""
  generalInfoEng = ""

  modeloActual : InformacionGeneral[] = []
  modeloModificado : InformacionGeneral[] = []

  constructor(private activatedRoute : ActivatedRoute, private informacionGeneralService : InformacionGeneralService){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idCompany = 0
    } else {
      this.idCompany = parseInt(id + '')
    }
  }

  compararModelosF : any
  ngOnInit(): void {
    const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
    if(paginaDetalleEmpresa){
      paginaDetalleEmpresa.classList.remove('hide-loader');
    }
    if(this.idCompany !== 0){
      this.informacionGeneralService.getGeneralInformationByIdCompany(this.idCompany).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const infoGeneral = response.data
            if(infoGeneral){
              this.id = infoGeneral.id
              this.generalInfo = infoGeneral.generalInfo
              if(infoGeneral.traductions.length === 1){
                this.generalInfoEng = infoGeneral.traductions[0].value
              }
            }
          }
        }
      ).add(
        () => {
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.add('hide-loader');
          }
          this.armarModeloActual()
          this.armarModeloModificado()
        }
      )
    }else{
      if(paginaDetalleEmpresa){
        paginaDetalleEmpresa.classList.add('hide-loader');
      }
    }
    this.armarModeloActual()
    this.armarModeloModificado()

    this.compararModelosF = setInterval(() => {
      this.compararModelos();
    }, 2000);
  }
  compararModelos(){
    this.armarModeloModificado()
    if(JSON.stringify(this.modeloActual) !== JSON.stringify(this.modeloModificado)){
      const tabInfoGeneral = document.getElementById('tab-info-general') as HTMLElement | null;
      if (tabInfoGeneral) {
        tabInfoGeneral.classList.add('tab-cambios')
      }
    }else{
      const tabInfoGeneral = document.getElementById('tab-info-general') as HTMLElement | null;
      if (tabInfoGeneral) {
        tabInfoGeneral.classList.remove('tab-cambios')
      }
    }
  }
  armarModeloActual(){
    this.modeloActual[0] = {
      id : this.id,
      idCompany : this.idCompany,
      generalInfo : this.generalInfo,
      traductions : [
        {
          key : 'L_I_GENERAL',
          value : this.generalInfoEng
        }
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idCompany : this.idCompany,
      generalInfo : this.generalInfo,
      traductions : [
        {
          key : 'L_I_GENERAL',
          value : this.generalInfoEng
        }
      ]
    }
  }

  guardar(){

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
        if (result.value) {
          const paginaDetalleEmpresa = document.getElementById('pagina-detalle-empresa') as HTMLElement | null;
          if(paginaDetalleEmpresa){
            paginaDetalleEmpresa.classList.remove('hide-loader');
          }
          this.informacionGeneralService.addGeneralInformation(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const tabInfoGeneral = document.getElementById('tab-info-general') as HTMLElement | null;
                  if (tabInfoGeneral) {
                    tabInfoGeneral.classList.add('tab-con-datos')
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
          this.informacionGeneralService.addGeneralInformation(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
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
