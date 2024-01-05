import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropiedadP } from 'app/models/informes/persona/propiedad';
import { PropiedadPService } from 'app/services/informes/persona/propiedad-p.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-p-propiedades',
  templateUrl: './p-propiedades.component.html',
  styleUrls: ['./p-propiedades.component.scss']
})
export class PPropiedadesComponent implements OnInit{

  id = 0
  idPerson = 0
  propertiesCommentary = ""
  propertiesCommentaryEng = ""

  modeloNuevo : PropiedadP[] = []
  modeloModificado : PropiedadP[] = []

  constructor(private propiedadService : PropiedadPService, private activatedRoute: ActivatedRoute, private router : Router){
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
      this.propiedadService.getPropiedad(this.idPerson).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const propiedad = response.data
            if(propiedad){
              this.id = propiedad.id
              this.propertiesCommentary = propiedad.propertiesCommentary
              if(propiedad.traductions.length > 0){
                this.propertiesCommentaryEng = propiedad.traductions[0].value
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
      propertiesCommentary : this.propertiesCommentary,
      traductions : [
        {
          key : "L_PR_DETAILS",
          value : this.propertiesCommentaryEng
        }
      ]
    }
  }
  armarModeloModificado(){
    this.modeloModificado[0] = {
      id : this.id,
      idPerson : this.idPerson,
      propertiesCommentary : this.propertiesCommentary,
      traductions : [
        {
          key : "L_PR_DETAILS",
          value : this.propertiesCommentaryEng
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
          this.propiedadService.addPropiedad(this.modeloNuevo[0]).subscribe(
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
          this.propiedadService.addPropiedad(this.modeloModificado[0]).subscribe(
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
