import { Component } from '@angular/core';
@Component({
  selector: 'app-ie-detalle',
  templateUrl: './ie-detalle.component.html',
  styleUrls: ['./ie-detalle.component.scss']
})
export class IEDetalleComponent {
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

}
