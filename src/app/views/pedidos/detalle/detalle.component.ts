import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '@shared/components/search-dialog/search-dialog.component';
import { ActivatedRoute } from '@angular/router';

interface Idioma {
  value: string;
  viewValue: string;
}
interface Continente {
  value: string;
  viewValue: string;
}
interface TipoInforme {
  value: string;
  viewValue: string;
}
interface TipoTramite {
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
  continentes: Continente[] = [
    {value: 'AMERICA', viewValue: 'América'},
    {value: 'AFRICA', viewValue: 'Africa'},
    {value: 'ASIA', viewValue: 'Asia'},
    {value: 'EUROPA', viewValue: 'Europa'},
    {value: 'OCEANIA', viewValue: 'Oceanía'}
  ];
  tipoInformes: TipoInforme[] = [
    {value: 'RV', viewValue: 'RV'},
    {value: 'OR', viewValue: 'OR'}
  ];
  tipoTramites: TipoTramite[] = [
    {value: 'T1', viewValue: 'T1'},
    {value: 'T2', viewValue: 'T2'},
    {value: 'T3', viewValue: 'T3'},
    {value: 'T4', viewValue: 'T4'}
  ];

  idiomaSeleccionado = this.idiomas[0].value
  continenteSeleccionado = this.continentes[0].value
  tipoInformeSeleccionado = this.tipoInformes[0].value
  tipoTramiteSeleccionado = this.tipoTramites[0].value

  public tipo_formulario: string | null = '';
  public formulario: string = '';
  public nmrCupon: string | null = '';
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
          items: ['Home', 'Pedidos'],
          active: 'Editar',
        },
      ];
    } else if (this.tipo_formulario == 'agregar') {
      this.breadscrums = [
        {
          title: 'Nuevo Cupón',
          items: ['Home', 'Pedidos'],
          active: '1',
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
