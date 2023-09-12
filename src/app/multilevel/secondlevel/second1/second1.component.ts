import { Component } from '@angular/core';

@Component({
  selector: 'app-second1',
  templateUrl: './second1.component.html',
  styleUrls: ['./second1.component.scss'],
})
export class Second1Component {
  breadscrums = [
    {
      title: 'Second 1',
      items: ['Multilevel', 'Second'],
      active: 'Second 1',
    },
  ];

  constructor() {
    //constructor
  }
}
