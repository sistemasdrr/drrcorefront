import { Component } from '@angular/core';

@Component({
  selector: 'app-second2',
  templateUrl: './second2.component.html',
  styleUrls: ['./second2.component.scss'],
})
export class Second2Component {
  breadscrums = [
    {
      title: 'Second 2',
      items: ['Multilevel', 'Second'],
      active: 'Second 2',
    },
  ];

  constructor() {
    //constructor
  }
}
