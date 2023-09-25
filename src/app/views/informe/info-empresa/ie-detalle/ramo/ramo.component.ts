import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RamoActividadDialogComponent } from '@shared/components/ramo-actividad/ramo-actividad.component';
import { Observable, map, startWith } from 'rxjs';

export interface data {
  name: string;
}

@Component({
  selector: 'app-ramo',
  templateUrl: './ramo.component.html',
  styleUrls: ['./ramo.component.scss']
})

export class RamoComponent implements OnInit{
  checkImportacion = false;
  importacion = "NO"
  checkExportacion = false;
  exportacion = "NO"

  constructor(  private dialog : MatDialog){
    this.filteredOptions = new Observable<data[]>();
  }

  importan(){
    if(this.checkImportacion){
      this.importacion = "SI"

    }else{
      this.importacion = "NO"
    }
  }
  exportan(){
    if(this.checkExportacion){
      this.exportacion = "SI"
    }else{
      this.exportacion = "NO"
    }
  }

  ramoActividadDialog() {
    const dialogRef = this.dialog.open(RamoActividadDialogComponent, {
    data: {
    },
  });
  }

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [{name: 'Propio Cancelado'}, {name: 'Alquilado'}, {name: 'Otro'}];
  filteredOptions: Observable<data[]>;

  private _filter(name: string): data[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
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
}
