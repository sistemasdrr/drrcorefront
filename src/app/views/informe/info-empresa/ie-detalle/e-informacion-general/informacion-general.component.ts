import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformacionGeneral } from 'app/models/informes/empresa/informacion-general';
import { InformacionGeneralService } from 'app/services/informes/empresa/informacion-general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.scss']
})
export class InformacionGeneralComponent implements OnInit {
  informacionGeneral = "";
  informacionIngGeneral = "";

  id = 0
  idCompany = 0
  generalInfo = ""
  generalInfoEng = ""

  modeloNuevo : InformacionGeneral[] = []
  modeloModificado : InformacionGeneral[] = []

  constructor(private activatedRoute : ActivatedRoute, private informacionGeneralService : InformacionGeneralService){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idCompany = 0
    } else {
      this.idCompany = parseInt(id + '')
    }
  }

  ngOnInit(): void {
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
      )
    }
  }
  armarModeloNuevo(){
    this.modeloNuevo[0] = {
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
          this.informacionGeneralService.addGeneralInformation(this.modeloNuevo[0]).subscribe(
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
                  this.armarModeloNuevo()
                  this.armarModeloModificado()
                })
                this.id = response.data
              }
            }
          )
        }
      });
    }
  }
}
