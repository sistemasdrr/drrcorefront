
import { Component } from '@angular/core';

@Component({
  selector: 'app-ip-detalle',
  templateUrl: './ip-detalle.component.html',
  styleUrls: ['./ip-detalle.component.scss']
})
export class IPDetalleComponent {
  breadscrums = [
    {
      title: 'Detalles de Persona',
      subtitle: 'Nombre de Persona',
      codigoInforme : 'X0000729604',
      usuario : 'Julio del Risco Lizarzaburu',
      items: ['Home', 'Informes'],
      active: 'Persona',
    },
  ];

}
