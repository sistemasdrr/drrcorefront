import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosEmpresa } from 'app/models/informes/empresa/datos-empresa';
import { DatosEmpresaService } from 'app/services/informes/empresa/datos-empresa.service';
@Component({
  selector: 'app-ie-detalle',
  templateUrl: './ie-detalle.component.html',
  styleUrls: ['./ie-detalle.component.scss']
})
export class IEDetalleComponent implements OnInit {

  title : string = 'Detalles de Empresa'
  subtitle : string = ''
  codigoInforme : string | null = '';


  private datosEmpresa : DatosEmpresa[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private datosEmpresaService : DatosEmpresaService
    ){
    this.codigoInforme = this.activatedRoute.snapshot.paramMap.get('codigoInforme');
  }

  ngOnInit(): void {
    console.log(this.codigoInforme)
    if(this.codigoInforme === 'nuevo'){
      this.subtitle = ' - Nuevo'
    }else{
      this.datosEmpresa = this.datosEmpresaService.getDatosEmpresa(this.codigoInforme+'')
      this.subtitle = ' - ' + this.datosEmpresa[0].razonSocial
    }
  }

  breadscrums = [
    {
      title: this.title,
      subtitle: this.subtitle,
      codigoInforme : this.codigoInforme,
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Home', 'Informes'],
      active: 'Empresa',
    },
  ];

}
