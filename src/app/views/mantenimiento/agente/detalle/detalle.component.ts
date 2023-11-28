import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-agente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleAgenteComponent implements OnInit{
  loading : boolean = true
  breadscrums = [
    {
      title: 'Detalle de Agente',
      subtitle: ' - Agente 1',
      items: ['Administración','Mantenimiento'],
      active: 'Agente',
    },
  ];

  constructor(){

  }
  ngOnInit(): void {
    this.loading = false
  }
}
