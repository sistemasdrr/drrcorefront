import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ie-detalle',
  templateUrl: './ie-detalle.component.html',
  styleUrls: ['./ie-detalle.component.scss']
})
export class IEDetalleComponent implements OnInit {

  title : string = 'Detalles de Empresa'
  subtitle : string = ''
  codigoInforme : string | null = '';
  usr = 'Julio del Risco Lizarzaburu'
  breadscrums = [
    {
      title: '',
      subtitle: '',
      codigoInforme : '',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Producción', 'Informes'],
      active: 'Empresa',
    },
  ]

  private datosEmpresa : DatosEmpresa[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private datosEmpresaService : DatosEmpresaService
    ){
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
  }

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  selectedIndex: number = 0;
  currentTabIndex: number = 0;

  onTabChange(event: any) {
    const selectedTabIndex = event.index;
   
    Swal.fire({
      title: '¿Está seguro de cambiar de pestaña sin guardar los cambios?',
      text: "",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      width: '20rem',
      heightAuto: true
    }).then((result) => {
      if (result.value) {
        this.tabGroup.selectedIndex = selectedTabIndex; // Cambia el tab después de la confirmación
        this.currentTabIndex = selectedTabIndex;
        console.log('se fue al índice ' + selectedTabIndex);
      } else {
        this.tabGroup.selectedIndex = this.currentTabIndex
        console.log('se quedó en el índice ' + this.currentTabIndex);
      }
    });
  }

  ngOnInit(): void {
    console.log(this.codigoInforme)
    if(this.codigoInforme === 'nuevo'){
      this.subtitle = ' - Nuevo'
    }else{
      this.datosEmpresa = this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+'')
      this.subtitle = ' - ' + this.datosEmpresa[0].razonSocial
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
