import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-abonado',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleAbonadoComponent implements OnInit{

  loading : boolean = true
  breadscrums = [
    {
      title: 'Detalle de Abonado',
      subtitle: ' - Abonado 1',
      items: ['Administración','Mantenimiento'],
      active: 'Abonado',
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
