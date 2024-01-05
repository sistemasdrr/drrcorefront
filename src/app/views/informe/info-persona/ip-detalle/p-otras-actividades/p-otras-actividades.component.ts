import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesP } from 'app/models/informes/persona/actividades';
import { ActividadesPService } from 'app/services/informes/persona/actividades-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-otras-actividades',
  templateUrl: './p-otras-actividades.component.html',
  styleUrls: ['./p-otras-actividades.component.scss']
})
export class POtrasActividadesComponent implements OnInit {

  id = 0
  idPerson = 0
  activitiesCommentary = ""
  activitiesCommentaryEng = ""

  modeloNuevo : ActividadesP[] = []
  modeloModificado : ActividadesP[] = []

  constructor(private actividadesServices : ActividadesPService, private activatedRoute: ActivatedRoute, private router : Router){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
    console.log(this.idPerson)
  }
  ngOnInit(): void {
    if(this.idPerson > 0){
      this.actividadesServices.getActividad(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const actividad = response.data
            if(actividad){
              this.id = actividad.id
              this.activitiesCommentary = actividad.activitiesCommentary
              if(actividad.traductions.length > 0){
                this.activitiesCommentaryEng = actividad.traductions[0].value
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
      idPerson : this.idPerson,
      activitiesCommentary : this.activitiesCommentary,
      traductions : [
        {
          key : "L_A_OTHERACT",
          value : this.activitiesCommentaryEng
        }
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      activitiesCommentary : this.activitiesCommentary,
      traductions : [
        {
          key : "L_A_OTHERACT",
          value : this.activitiesCommentaryEng
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
          this.actividadesServices.addActividad(this.modeloNuevo[0]).subscribe(
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
          this.actividadesServices.addActividad(this.modeloModificado[0]).subscribe(
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
