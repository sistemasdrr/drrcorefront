import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { InfoGeneralP } from 'app/models/informes/persona/info-general';
import { InfoGeneralPService } from 'app/services/informes/persona/info-general-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-info-general',
  templateUrl: './p-info-general.component.html',
  styleUrls: ['./p-info-general.component.scss'],
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
export class PInfoGeneralComponent implements OnInit{

  id = 0
  idPerson = 0
  generalInformation = ""
  generalInformationEng  = ""

  modeloActual : InfoGeneralP[] = []
  modeloModificado : InfoGeneralP[] = []

  constructor(private infoGeneralService : InfoGeneralPService, private activatedRoute: ActivatedRoute){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
    console.log(this.idPerson)
  }

  compararModelosF : any
  ngOnInit(): void {
    const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
    if(loader){
      loader.classList.remove('hide-loader');
    }
    if(this.idPerson > 0){
      this.infoGeneralService.getInfoGeneral(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const infoGeneral = response.data
            if(infoGeneral){
              this.id = infoGeneral.id
              this.generalInformation = infoGeneral.generalInformation
              if(infoGeneral.traductions.length > 0){
                this.generalInformationEng = infoGeneral.traductions[0].value
              }
            }
          }
        }
      ).add(
        () => {
          if(loader){
            loader.classList.add('hide-loader');
          }

          this.armarModeloActual()
          this.armarModeloModificado()
        }
      )
    }else{
      if(loader){
        loader.classList.add('hide-loader');
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
      const tabInfoGeneral = document.getElementById('tab-p-info-general') as HTMLElement | null;
      if (tabInfoGeneral) {
        tabInfoGeneral.classList.add('tab-cambios')
      }
    }else{
      const tabInfoGeneral = document.getElementById('tab-p-info-general') as HTMLElement | null;
      if (tabInfoGeneral) {
        tabInfoGeneral.classList.remove('tab-cambios')
      }
    }
  }
  armarModeloActual(){
    this.modeloActual[0] = {
      id : this.id,
      idPerson : this.idPerson,
      generalInformation : this.generalInformation,
      traductions : [
        {
          key : "L_IG_DETAILS",
          value : this.generalInformationEng
        }
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      generalInformation : this.generalInformation,
      traductions : [
        {
          key : "L_IG_DETAILS",
          value : this.generalInformationEng
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
          const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
          if(loader){
            loader.classList.remove('hide-loader');
          }
          this.infoGeneralService.addInfoGeneral(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const tabInfoGeneral = document.getElementById('tab-p-info-general') as HTMLElement | null;
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
          this.infoGeneralService.addInfoGeneral(this.modeloModificado[0]).subscribe(
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
