import { ActivatedRoute } from '@angular/router';
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

  id = 0

  constructor(private activatedRoute : ActivatedRoute){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id?.includes('nuevo')) {
      this.id = 0
    } else {
      this.id = parseInt(id + '')
    }
  }
  ngOnInit(): void {
    this.loading = false
  }
}
