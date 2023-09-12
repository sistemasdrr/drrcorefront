import { Component } from '@angular/core';

@Component({
  selector: 'app-first3',
  templateUrl: './first3.component.html',
  styleUrls: ['./first3.component.scss'],
})
export class First3Component {
  breadscrums = [
    {
      title: 'First 3',
      items: ['Multilevel'],
      active: 'First 3',
    },
  ];

  constructor() {
    // constructor
  }
}
