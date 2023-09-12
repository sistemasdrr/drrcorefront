import { Component } from '@angular/core';

import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-order-reception',
  templateUrl: './order-reception.component.html',
  styleUrls: ['./order-reception.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class OrderReceptionComponent {
  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Home'],
      active: 'Dashboard 2',
    },
  ];
}
