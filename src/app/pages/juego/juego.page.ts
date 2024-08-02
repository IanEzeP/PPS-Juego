import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
  host: {
    '(document:keydown)': 'keyPress($event)'
  }
})
export class JuegoPage implements OnInit, OnDestroy {

  /**
   * Limite inferior >= 370 -- Limite superior <= -370
   * Limite derecho >= 170 -- Limite izquierdo <= -170 
   */
  public yPos = 0;
  public xPos = 0;

  private subscription = Subscription.EMPTY;

  public yVel = 0;
  public xVel = 0;

  constructor(public screenOrientation: ScreenOrientation, public deviceMotion: DeviceMotion, private alerts: AlertService) { }

  ngOnInit() {
    document.getElementById("box")!.style.position = "relative";
    document.getElementById("box")!.style.top = `0px`;
    document.getElementById("box")!.style.left = `0px`;

    this.alerts.sweetAlert('¿Estás listo para jugar?', '', 'info').then(() => {
      this.startGame();
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  startGame() {
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      
      if(this.yPos >= 370 || this.yPos <= -370 || this.xPos >= 170 || this.xPos <= -170)
      {
        this.yPos = 0;
        this.xPos = 0;
        console.log("Limites tocados");
        
      }
      //console.log(`Acelerómetro: X: ${acceleration.x} Y: ${acceleration.y} Z: ${acceleration.z}`);

      if (acceleration.x >= 1) {
        this.xPos = this.xPos - (acceleration.x * 3);
      }
      if (acceleration.x <= -1) {
        this.xPos = this.xPos - (acceleration.x * 3);
      }
      if (acceleration.y >= 1) {
        this.yPos = this.yPos + (acceleration.y * 4);
      }
      if (acceleration.y <= -1) {
        this.yPos = this.yPos + (acceleration.y * 4);
      }
      if((acceleration.y > -1 && acceleration.y < 1) && (acceleration.x > -1 && acceleration.x < 1) && acceleration.z >= 9) {
        this.yPos = this.yPos + acceleration.z;
      }

      document.getElementById("box")!.style.position = "relative";
      document.getElementById("box")!.style.top = `${this.yPos}px`;
      document.getElementById("box")!.style.left = `${this.xPos}px`;
    });
  }
}
