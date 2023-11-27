import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(){

  }
  ngOnInit(): void {
    this.loading = false
  }
}
