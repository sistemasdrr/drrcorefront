import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input()
  title!: string;
  @Input()
  subtitle!: string;
  @Input()
  usuario!: string;
  @Input()
  codigoInforme!: string;
  @Input()
  cupon!: string;

  fecha : Date = new Date()
  @Input()
  items!: string[];
  @Input()
  active_item!: string;

  constructor() {
    //constructor
  }
}
