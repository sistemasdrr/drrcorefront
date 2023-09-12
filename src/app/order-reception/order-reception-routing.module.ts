import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReceptionComponent } from './order-reception.component';

const routes: Routes = [
  {
  path: '', component: OrderReceptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderReceptionRoutingModule { }
