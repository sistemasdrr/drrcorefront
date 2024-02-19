import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesP } from 'app/models/informes/persona/actividades';
import { ActividadesPService } from 'app/services/informes/persona/actividades-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-otras-actividades',
  templateUrl: './p-otras-actividades.component.html',
  styleUrls: ['./p-otras-actividades.component.scss'],
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
export class POtrasActividadesComponent implements OnInit {

  id = 0
  idPerson = 0
  activitiesCommentary = ""
  activitiesCommentaryEng = ""

  modeloActual : ActividadesP[] = []
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
  compararModelosF : any
  ngOnInit(): void {
    const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
    if(loader){
      loader.classList.remove('hide-loader');
    }
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
      const tabActividades = document.getElementById('tab-actividades') as HTMLElement | null;
      if (tabActividades) {
        tabActividades.classList.add('tab-cambios')
      }
    }else{
      const tabActividades = document.getElementById('tab-actividades') as HTMLElement | null;
      if (tabActividades) {
        tabActividades.classList.remove('tab-cambios')
      }
    }
  }
  armarModeloActual(){
    this.modeloActual[0] = {
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
          this.actividadesServices.addActividad(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const tabActividades = document.getElementById('tab-actividades') as HTMLElement | null;
                if (tabActividades) {
                  tabActividades.classList.add('tab-con-datos')
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
