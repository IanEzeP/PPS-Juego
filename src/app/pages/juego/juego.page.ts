import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
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
  public yVel = 0;
  public xVel = 0;

  private subscription = Subscription.EMPTY;

  public heroe: string = '';
  public heroePath: string = '';
  public equipo: string = '';
  public juegoTerminado = false;

  public destroy = new Subject();
  public timer: number = 0;
  public rxjsTimer = timer(0, 1000);

  constructor(private screenOrientation: ScreenOrientation, private deviceMotion: DeviceMotion, private alerts: AlertService,
    private router: Router, private route: ActivatedRoute, private firestore: AngularFirestore, private auth: AuthService) { }

  ngOnInit() {
    this.heroe = this.route.snapshot.paramMap.get('hero')!;
    this.equipo = this.route.snapshot.paramMap.get('team')!;

    console.log(this.heroe + ' - ' + this.equipo);

    this.heroePath = `assets/images/${this.heroe}.png`;

    document.getElementById("box")!.style.position = "relative";
    document.getElementById("box")!.style.top = `0px`;
    document.getElementById("box")!.style.left = `0px`;

    this.alerts.sweetAlert('¿Estás listo para jugar?', '', 'info').then(() => {
      this.cargarTimer();
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
        //this.gameOver();
      }
      //console.log(`Acelerómetro: X: ${acceleration.x} Y: ${acceleration.y} Z: ${acceleration.z}`);
      console.log(`Acelerómetro: X: ${this.xPos} Y: ${this.yPos} Z: ${acceleration.z}`);

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
        this.yPos = this.yPos + 5;//acceleration.z;
      }

      document.getElementById("box")!.style.position = "relative";
      document.getElementById("box")!.style.top = `${this.yPos}px`;
      document.getElementById("box")!.style.left = `${this.xPos}px`;
    });
  }

  async gameOver() {
    let id = this.firestore.createId();
    const documento = this.firestore.doc("puntos-heroes/" + id);
    documento.set(
    {
      tiempo : this.timer,
      usuario: this.auth.nombre,
      horoe: this.heroe,
      equipo: this.equipo
    });

    await Swal.fire(
      {
        heightAuto: false,
        title: "Partida finalizada",
        text: "Tiempo de supervivencia: " + this.timer + " segundos",
        showDenyButton: true,
        denyButtonColor: "#5DE2E7",
        denyButtonText: "Volver al menú",
        confirmButtonColor: "#7DDA58",
        confirmButtonText: "Ver tabla de puntuación",
      }
    ).then((result) => {
      if (result.isConfirmed) 
      {
        this.router.navigateByUrl('/puntuacion');
      }
      else if (result.isDenied)
      {
        this.router.navigateByUrl('/home');  
      }
    });
  }

  cargarTimer()
  {
    this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe((val:any) => {
      this.timer = val;

      if (this.juegoTerminado == true) {
        this.destroy.next('done');
        this.destroy.complete();
      }
    });
  }
}
