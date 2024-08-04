import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntuacionPage } from './puntuacion.page';

const routes: Routes = [
  {
    path: '',
    component: PuntuacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntuacionPageRoutingModule {}
