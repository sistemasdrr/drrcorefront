
import { Component, OnInit } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ip-detalle',
  templateUrl: './ip-detalle.component.html',
  styleUrls: ['./ip-detalle.component.scss'],
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
export class IPDetalleComponent implements OnInit {
  title : string = 'Detalles de Empresa'
  subtitle : string = ''
  codigoInforme : string | null = '';
  usr = 'Julio del Risco Lizarzaburu'

  breadscrums = [
    {
      title: 'Detalles de Persona',
      subtitle: 'Nombre de Persona',
      codigoInforme : 'X0000729604',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Producción', 'Informes'],
      active: 'Persona',
    },
  ];

  loading: boolean = false;
  id = 0

  person = false
  home = false
  job = false
  activities = false
  properties = false
  sbs = false
  history = false
  infoGeneral = false
  images = false

  constructor(private activatedRoute: ActivatedRoute,private router : Router, private personaService : DatosGeneralesService){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
  }
  ngOnInit(): void {

    if(this.id > 0){
      this.personaService.getPersonaById(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const datosPersona = response.data
            this.codigoInforme = datosPersona.oldCode
            this.subtitle = datosPersona.fullname
          }else{
            Swal.fire({
              title: "No se encontró el informe",
              text: "",
              icon: 'warning',
              confirmButtonColor: '#d33',
              confirmButtonText: 'Ok',
              width: '20rem',
              heightAuto : true
            }).then(() => {
              this.router.navigate(['informes/persona/lista']);
            });
          }
        }
      ).add(
        () => {
          if(this.id !== 0){
            this.breadscrums = [
              {
                title: this.title,
                subtitle: this.subtitle,
                codigoInforme : this.codigoInforme+'',
                usuario : this.usr,
                items: ['Producción', 'Informes'],
                active: 'Persona',
              },
            ]
          }
        }
      )
      this.personaService.getStatus(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            console.log(response.data)
            const status = response.data
            if(status){
              this.person = status.person
              this.home = status.home
              this.job = status.job
              this.activities = status.activities
              this.properties = status.properties
              this.sbs = status.sbs
              this.history = status.history
              this.infoGeneral = status.infoGeneral
              this.images = status.images
            }
          }
        }
      )
    }

  }
}
