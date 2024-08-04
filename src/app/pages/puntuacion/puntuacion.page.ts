import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.page.html',
  styleUrls: ['./puntuacion.page.scss'],
})
export class PuntuacionPage implements OnInit, OnDestroy {

  private obsDatabase: Subscription = Subscription.EMPTY;

  public usuarios: Array<any> = [];
  public topPuntos: Array<any> = [];
  public equipo: string = 'marvel';

  public equipoInicial: any = undefined;

  constructor(private data: DatabaseService, private router: Router) { }

  ngOnInit()
  {
    this.obsDatabase = this.data.getCollectionObservable('puntos-heroes').subscribe((next: any) =>
    {
      let result: Array<any> = next;
      this.usuarios = [];
      
      result.forEach((obj: any) => {
        this.usuarios.push(obj);
      });
      this.usuarios.sort((a, b) => b.tiempo - a.tiempo);
      
      console.log("finalizo carga");
      this.equipoInicial = { target: {value: this.equipo}};
      this.onChangeDif(this.equipoInicial);
    });
  }

  ngOnDestroy(): void 
  {
    this.obsDatabase.unsubscribe();
  }

  onChangeDif(selection: any) 
  {
    this.equipo = selection.target.value; 
    switch (this.equipo)
    {
      case 'marvel':
        this.topPuntos = [];
        this.usuarios.forEach(data => {
          if(data.equipo == 'marvel')
          {
            if(this.topPuntos.length < 5)
            {
              this.topPuntos.push(data);
            }
          }
        });
        break;
      case 'dc':
        this.topPuntos = [];
        this.usuarios.forEach(data => {
          if(data.equipo == 'dc')
          {
            if(this.topPuntos.length < 5)
            {
              this.topPuntos.push(data);
            }
          }
        });
        break;
    }
  }

  onVolver()
  {
    this.router.navigateByUrl('/home');
  }

}
