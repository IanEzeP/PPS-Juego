import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoPageRoutingModule } from './juego-routing.module';

import { JuegoPage } from './juego.page';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@NgModule({
  providers: [
    DeviceMotion,
    ScreenOrientation
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoPageRoutingModule
  ],
  declarations: [JuegoPage]
})
export class JuegoPageModule {}
