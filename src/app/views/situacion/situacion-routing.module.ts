import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSituacionComponent } from './lista/lista.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  {
    path: 'lista', component: ListaSituacionComponent,
    title : 'Situación - DRR Core V1'
  },
  {
    path: 'historial', component: HistorialComponent,
    title : 'Historial - DRR Core V1'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SituacionRoutingModule { }
