import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoGeneralP } from 'app/models/informes/persona/info-general';
import { InfoGeneralPService } from 'app/services/informes/persona/info-general-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-info-general',
  templateUrl: './p-info-general.component.html',
  styleUrls: ['./p-info-general.component.scss']
})
export class PInfoGeneralComponent implements OnInit{

  id = 0
  idPerson = 0
  generalInformation = ""
  generalInformationEng  = ""

  modeloNuevo : InfoGeneralP[] = []
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
        }
      )
    }else{
      if(loader){
        loader.classList.add('hide-loader');
      }
    }
  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
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
          this.infoGeneralService.addInfoGeneral(this.modeloNuevo[0]).subscribe(
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
