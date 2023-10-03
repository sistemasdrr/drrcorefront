import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
import { Pais } from 'app/models/pais';
import { PaisService } from 'app/services/pais.service';
import { Observable, map, startWith } from 'rxjs';

export interface data {
  name: string;
}


@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit{
  idiomaInforme : string = ""

  situacionRUC : string[] = [
    "Activa", "Baja de Oficio", "Baja Definitiva","Baja Provisional",
    "Cambio de Razón Social","Declarada en Quiebra","Disuelta",
    "En Liquidación","Fusionada","Inactiva","Informe de Prueba",
    "Inmovilizada Judicialmente","No Localizada con ese Nombre",
    "Solo para Lectura","Suspensión Definitiva","Suspensión Temporal"
  ]
  personeriaJuridica : string[] = [
    "Sociedad de Hecho","Sociedad de Producción Rural","Sociedad de Producción Rural de Resp. Ltda. de Cap. Variable",
    "Sociedad de Producción Rural de Resp. Ilimitada","Sociedad de Producción Rural de Resp. Limitada",
    "Sociedad de Responsabilidad Limitada","Sociedad de Responsabilidad Limitada de Cap. Variable",
    "Sociedad de Responsabilidad Limitada Microindustrial","Sociedad del Estado"
  ]
  calificacionCrediticia : string[] = [
    "A+: SIN RIESGO (Solventes, Situación Financiera Muy Buena)",
    "A-: RIESGO MINIMO (Solventes, Situación Financiera Satisfactoria)",
    "B: RIESGO MODERADO (Situación Financiera Levemente Extendida)",
    "C: RIESGO ALTO (Situación Extendida, Se recomienda Garantía Colateral)",
    "D: RIESGO MUY ALTO (Situación Financiera Pesada. Pérdidas)",
    "E: RIESGO MUY ALTO (Inoperativa o Liquidad o Quebrada)",
    "NN: RIESGO INDETERMINADO (Información Insuficiente o Inexistente)"
  ]
  politicaPagos : string[] = [
    "1. EXCELENTES PAGADORES (Pagan siempre a tiempo o antes)",
    "2. PUNTUALES (Pagan siempre a tiempo, varios años)",
    "3. IRREGULARES (Pagos puntuales y a veces demorados)",
    "4. MOROSOS (Demoras constantes, Incumplidos, Protestos)",
    "5. ND (No se pudo determinar Política de Pagos al momento. Nuevos)",
    "6. NC (No se le reporta Notas en Contra. Se presume buen cumplimiento)",
    "7. NN (Carece de información crediticia. No son conocidos por consultados)"
  ]


  myControl = new FormControl<string | data>('');
  options: data[] = [{name: '112'}, {name: '113'}, {name: '114'}, {name: '115'}, {name: '116'}, {name: '117'}, {name: '118'}, {name: '119'}];
  filteredOptions: Observable<data[]>;
constructor(
  private dialog : MatDialog,
  private PaisService : PaisService,
) {
  this.filteredOptions = new Observable<data[]>();
  this.paises = this.PaisService.getPaises()

}
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: data): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  agregarComentario(titulo : string, subtitulo : string, empresa : string) {
    const dialogRef = this.dialog.open(TraduccionDialogComponent, {
    data: {
      titulo : titulo,
      subtitulo : subtitulo,
      empresa: empresa,

    },
  });
  }

  //TITULOS
  tituloComentarioIdentificacion : string = 'Comentario - Traduccion || Comentario de Identificación En => '
  tituloComentarioReputación : string = 'Comentario - Traduccion || Comentario de Reputación En => '
  tituloComentarioPrensa : string = 'Comentario - Traduccion || Comentario de Prensa En => '

  idiomaSeleccionado : string = ""
  actualizarSeleccionIdioma(idioma : string){
    this.idiomaSeleccionado = idioma
  }

  paises : Pais[] = []

  paisSeleccionado : number =0
  iconoSeleccionado: string = ""
  actualizarSeleccionPais(id: number) {
    const paisSeleccionadoObj = this.paises.find((pais) => pais.id === id);
    if (paisSeleccionadoObj) {
      this.paisSeleccionado = paisSeleccionadoObj.id;
      this.iconoSeleccionado = paisSeleccionadoObj.icono;
    }
  }
}
