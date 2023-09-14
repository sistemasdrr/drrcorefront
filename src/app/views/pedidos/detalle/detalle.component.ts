import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '@shared/components/search-dialog/search-dialog.component';
import { ActivatedRoute } from '@angular/router';

interface Idioma {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  idiomas: Idioma[] = [
    {value: 'SPANISH', viewValue: 'Español'},
    {value: 'ENGLISH', viewValue: 'Inglés'}
  ];
  idiomaSeleccionado = this.idiomas[0].value;
  public tipo_formulario: string | null = '';
  public formulario: string = '';
  private nmrCupon: string | null = '';
  isChecked = true;
  nombre_abonado : string = "SI"
  breadscrums = [
    {
      title: '',
      items: [''],
      active: '',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  revelarNombre(){
    if(this.isChecked){
      this.nombre_abonado = "SI"
    }else{
      this.nombre_abonado = "NO"
    }
  }

  ngOnInit() {
    this.tipo_formulario = this.activatedRoute.snapshot.paramMap.get('tipo');
    this.nmrCupon = this.activatedRoute.snapshot.paramMap.get('cupon');

    if (this.tipo_formulario == 'editar') {
      this.breadscrums = [
        {
          title: 'Editar Cupón',
          items: ['Home', 'Pedidos', 'Editar'],
          active: this.nmrCupon || '',
        },
      ];
    } else if (this.nmrCupon == 'nuevo') {
      this.breadscrums = [
        {
          title: 'Nuevo Cupón',
          items: ['Home', 'Pedidos'],
          active: 'Agregar',
        },
      ];
    }
  }

  TipoFormulario(tipo: string) {
    this.tipo_formulario = tipo;
  }

  getTipoFormulario(): string {
    return this.tipo_formulario || '';
  }

  getNmrCupon() {
    return this.nmrCupon;
  }

  search() {
    this.dialog.open(SearchDialogComponent, {
      data: {
        data: 'panda',
      },
    });
  }
}
