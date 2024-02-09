import { FacturacionModule } from './views/facturacion/facturacion.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module')
          .then((m) => m.DashboardModule)
          ,canActivate: [AuthGuard],
        title: 'Dashboard DRR Core'
      },
      {
        path: 'advance-table',
        loadChildren: () =>
          import('./advance-table/advance-table.module').then(
            (m) => m.AdvanceTableModule
          ),
      },
      {
        path: 'order-reception',
        loadChildren: () =>
          import('./order-reception/order-reception.module')
          .then((m) => m.OrderReceptionModule)
          ,canActivate: [AuthGuard]
      },
      {
        path: 'facturacion',
        loadChildren: () =>
          import('./views/facturacion/facturacion.module')
          .then((m) => m.FacturacionModule)
          ,canActivate: [AuthGuard]
      },
      {
        path: 'maestro',
        loadChildren: () =>
          import('./views/maestro/maestro.module')
          .then((m) => m.MaestroModule)
          ,canActivate: [AuthGuard]
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('./views/pedidos/pedidos.module').
          then((m) => m.PedidosModule)
            ,canActivate: [AuthGuard]
      },
      {
        path: 'informes',
        loadChildren: () =>
          import('./views/informe/informe.module').
          then((m) => m.InformeModule)
            ,canActivate: [AuthGuard]
      },
      {
        path: 'situacion',
        loadChildren: () =>
          import('./views/situacion/situacion.module').
          then((m) => m.SituacionModule)
            ,canActivate: [AuthGuard]
      },
      {
        path: 'despacho',
        loadChildren: () =>
          import('./views/despacho/despacho.module').
          then((m) => m.DespachoModule)
            ,canActivate: [AuthGuard]
      },
      {
        path: 'mantenimiento',
        loadChildren: () =>
          import('./views/mantenimiento/mantenimiento.module').
          then((m) => m.MantenimientoModule)
            ,canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
