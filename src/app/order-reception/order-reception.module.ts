import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderReceptionRoutingModule } from './order-reception-routing.module';
import { OrderReceptionComponent } from './order-reception.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    OrderReceptionComponent
  ],
  imports: [
    CommonModule,
    OrderReceptionRoutingModule,
    SharedModule
  ]
})
export class OrderReceptionModule { }
