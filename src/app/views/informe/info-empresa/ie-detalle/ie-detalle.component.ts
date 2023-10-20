import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-ie-detalle',
  templateUrl: './ie-detalle.component.html',
  styleUrls: ['./ie-detalle.component.scss']
})
export class IEDetalleComponent implements OnInit {
  
  breadscrums = [
    {
      title: 'Detalles de Empresa',
      subtitle: 'Nombre de Empresa',
      codigoInforme : 'Z0000729604',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Home', 'Informes'],
      active: 'Empresa',
    },
  ];

  codInforme = 1

  ngOnInit(): void {

  }

}
