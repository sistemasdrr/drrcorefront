
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGeneralesService } from 'app/services/informes/persona/datos-generales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ip-detalle',
  templateUrl: './ip-detalle.component.html',
  styleUrls: ['./ip-detalle.component.scss']
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
    }

  }
}
