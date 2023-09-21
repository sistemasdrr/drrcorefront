import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmpresaRelacionada } from 'app/models/empresa-relacionada';
import { EmpresaRelacionadaService } from 'app/services/empresa-relacionada.service';
import { Observable, map, startWith } from 'rxjs';

export interface data {
  name: string;
}

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent implements OnInit{
  //TABLA
  dataSource: MatTableDataSource<EmpresaRelacionada>;
  columnsToDisplay = ['razonSocial', 'pais', 'fechaEstablecimiento', 'registroTributario', 'estado', 'accion'];
  selection = new SelectionModel<EmpresaRelacionada>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filter') filter!: ElementRef;

  myControl = new FormControl<string | data>('');
  options: data[] = [{name: '112'}, {name: '113'}, {name: '114'}, {name: '115'}, {name: '116'}, {name: '117'}, {name: '118'}, {name: '119'}];
  filteredOptions: Observable<data[]>;
constructor(
  private router : Router,
  public dialog: MatDialog,
  private empresaRelacionadaService : EmpresaRelacionadaService) {
  this.filteredOptions = new Observable<data[]>();
  this.dataSource = new MatTableDataSource(this.empresaRelacionadaService.getListEmpresasRelacionadas())
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
}
