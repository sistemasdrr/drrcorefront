import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TraduccionDialogComponent } from '@shared/components/traduccion-dialog/traduccion-dialog.component';
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

  myControl = new FormControl<string | data>('');
  options: data[] = [{name: '112'}, {name: '113'}, {name: '114'}, {name: '115'}, {name: '116'}, {name: '117'}, {name: '118'}, {name: '119'}];
  filteredOptions: Observable<data[]>;
constructor(
  private dialog : MatDialog
) {
  this.filteredOptions = new Observable<data[]>();
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
}
