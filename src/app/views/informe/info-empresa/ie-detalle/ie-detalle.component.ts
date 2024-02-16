import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ie-detalle',
  templateUrl: './ie-detalle.component.html',
  styleUrls: ['./ie-detalle.component.scss'],
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
export class IEDetalleComponent implements OnInit {

  title : string = 'Detalles de Empresa'
  subtitle : string = ''
  codigoInforme : string | null = '';
  usr = 'Julio del Risco Lizarzaburu'
  breadscrums = [
    {
      title: 'Nuevo',
      subtitle: '',
      codigoInforme : '',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Producción', 'Informes'],
      active: 'Empresa',
    },
  ]

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  selectedIndex: number = 0;
  currentTabIndex: number = 0;

  loading: boolean = true;
  id = 0
  cupon = ""

  company = false
  background = false
  branch = false
  financial = false
  balance = false
  sbs = false
  opinion = false
  infoGeneral = false
  images = false

  constructor(private renderer: Renderer2,private activatedRoute: ActivatedRoute,private router : Router, private datosEmpresaService : DatosEmpresaService){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const cupon = this.activatedRoute.snapshot.paramMap.get('cupon');

    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
    if(cupon !== null && cupon !== ""){
      console.log('cupon: '+cupon)
      this.cupon= cupon
    }
  }

  ngOnInit(): void {
    const tabCompany = document.getElementById('tab-datos-empresa') as HTMLElement | null;
    const tabBackground = document.getElementById('tab-antecedentes') as HTMLElement | null;
    const tabBranch = document.getElementById('tab-ramo-negocio') as HTMLElement | null;
    const tabFinancial = document.getElementById('tab-finanzas') as HTMLElement | null;
    const tabBalance = document.getElementById('tab-balance') as HTMLElement | null;
    const tabSbs = document.getElementById('tab-sbs-riesgo') as HTMLElement | null;
    const tabOpinion = document.getElementById('tab-opinion-credito') as HTMLElement | null;
    const tabInfoGeneral = document.getElementById('tab-info-general') as HTMLElement | null;
    const tabImages = document.getElementById('tab-imagenes') as HTMLElement | null;
    if (tabCompany) {
      tabCompany.classList.remove('tab-cambios')
    }
    if(this.id > 0){
      this.datosEmpresaService.getStatus(this.id).subscribe(
        (response) => {
          if(response.isSuccess === true && response.isWarning === false){
            const status = response.data
            if(status){
              this.company = status.company
              this.background = status.background
              this.branch = status.branch
              this.financial = status.financial
              this.balance = status.balance
              this.sbs = status.sbs
              this.opinion = status.opinion
              this.infoGeneral = status.infoGeneral
              this.images = status.images
            }
          }
        }
      )
      this.datosEmpresaService.getDatosEmpresaPorId(this.id).subscribe((response) => {
        if(response.isSuccess === true && response.isWarning === false){
          const DatosEmpresa = response.data
          this.codigoInforme = DatosEmpresa.oldCode
          this.subtitle = DatosEmpresa.name
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
            this.router.navigate(['informes/empresa/lista']);
          });
        }
      },(error) => {
        this.loading = false
        Swal.fire({
          title: 'Ocurrió un problema. Comunicarse con Sistemas',
          text: error,
          icon: 'warning',
          confirmButtonColor: 'blue',
          confirmButtonText: 'Ok',
          width: '40rem',
          heightAuto : true
        }).then(() => {
        })
      }).add(() => {
        this.loading = false
      })
    }else{
      this.loading = false
    }
    if(this.codigoInforme === 'nuevo'){
      this.subtitle = ' - Nuevo'
    }else{
      // this.datosEmpresa = this.datosEmpresaService.getDatosEmpresaPorCodigo(this.codigoInforme+'')
      // if(this.datosEmpresa[0] == null){
      //   this.router.navigate(['**']);
      // }
      // this.subtitle = ' - ' + this.datosEmpresa[0].razonSocial
    }
    this.breadscrums = [
      {
        title: this.title,
        subtitle: this.subtitle,
        codigoInforme : this.codigoInforme+'',
        usuario : this.usr,
        items: ['Producción', 'Informes'],
        active: 'Empresa',
      },
    ]
  }

}
