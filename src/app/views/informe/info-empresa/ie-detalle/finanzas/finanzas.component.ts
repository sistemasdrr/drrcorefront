import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

export interface data {
  name: string;
}

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {

  constructor(){
    this.filteredOptions = new Observable<data[]>();
  }

  //titularidad
  myControl = new FormControl<string | data>('');
  options: data[] = [{name: 'TF: Se logro preparar el informe exclusivamente por terceros'}, {name: 'otro 1'}, {name: 'otro 2'}];
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
