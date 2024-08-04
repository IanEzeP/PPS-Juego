import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntuacionPageRoutingModule } from './puntuacion-routing.module';

import { PuntuacionPage } from './puntuacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntuacionPageRoutingModule
  ],
  declarations: [PuntuacionPage]
})
export class PuntuacionPageModule {}
