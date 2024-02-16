import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialP } from 'app/models/informes/persona/historial';
import { HistorialPService } from 'app/services/informes/persona/historial-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-historia',
  templateUrl: './p-historia.component.html',
  styleUrls: ['./p-historia.component.scss'],
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
export class PHistoriaComponent implements OnInit {

  id = 0
  idPerson = 0
  historyCommentary = ""
  historyCommentaryEng = ""

  modeloActual : HistorialP[] = []
  modeloModificado : HistorialP[] = []

  constructor(private historialService : HistorialPService, private activatedRoute: ActivatedRoute, private router : Router){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.idPerson = 0
    } else {
      this.idPerson = parseInt(id + '')
    }
    console.log(this.id)
  }
  compararModelosF : any
  ngOnInit(): void {
    const loader = document.getElementById('pagina-detalle-persona') as HTMLElement | null;
    if(loader){
      loader.classList.remove('hide-loader');
    }
    if(this.idPerson > 0){
      this.historialService.getHistorial(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const historial = response.data
            if(historial){
              this.id = historial.id
              this.historyCommentary = historial.historyCommentary
              if(historial.traductions.length > 0){
                this.historyCommentaryEng = historial.traductions[0].value
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
      const tabHistoria = document.getElementById('tab-historia') as HTMLElement | null;
      if (tabHistoria) {
        tabHistoria.classList.add('tab-cambios')
      }
    }else{
      const tabHistoria = document.getElementById('tab-historia') as HTMLElement | null;
      if (tabHistoria) {
        tabHistoria.classList.remove('tab-cambios')
      }
    }
  }
  armarModeloActual(){
    this.modeloActual[0] = {
      id : this.id,
      idPerson : this.idPerson,
      historyCommentary : this.historyCommentary,
      traductions : [
        {
          key : "L_H_DETAILS",
          value : this.historyCommentaryEng
        }
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      historyCommentary : this.historyCommentary,
      traductions : [
        {
          key : "L_H_DETAILS",
          value : this.historyCommentaryEng
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
          this.historialService.addHistorial(this.modeloModificado[0]).subscribe(
            (response) => {
              if(response.isSuccess === true && response.isWarning === false){
                const tabHistoria = document.getElementById('tab-historia') as HTMLElement | null;
                if (tabHistoria) {
                  tabHistoria.classList.add('tab-con-datos')
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
          this.historialService.addHistorial(this.modeloModificado[0]).subscribe(
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

