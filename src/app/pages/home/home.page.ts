import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public team: string = '';

  public showTeam: boolean = true;
  public showHeroes: boolean = false;

  public arrayMarvel: Array<any> = [
    { hero: 'Spiderman', logo: 'spidermanlogo3'}, 
    { hero: 'CapAmerica', logo: 'capilogo2'}, 
    { hero: 'BlackWidow', logo: 'BlackWidowLogoPNG'}
  ];
  public arrayDC: Array<any> = [
    { hero: 'WonderWoman', logo: 'WWlogo'}, 
    { hero: 'Superman2', logo: 'supermanlogo'}, 
    { hero: 'Batman2', logo: 'Batmanlogopng'}
  ];
  public arrayClass: Array<string> = ['red', 'blue', 'dark'];

  public displayArray: Array<any> = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  chooseTeam(equipo: string) {
    this.team = equipo;
    this.showTeam = false;
    this.showHeroes = true;

    let arrayTeam = this.team == 'dc' ? this.arrayDC : this.arrayMarvel;
    
    for (let i = 0; i < 3; i++) {
      this.displayArray[i] = { hero: arrayTeam[i].hero, logo: `assets/images/${arrayTeam[i].logo}.png`, class: this.arrayClass[i]};
    }
  }

  chooseHero(heroe: string) {
    this.router.navigateByUrl(`/juego/${heroe}/${this.team}`);
  }

  cerraSesion() {
    Swal.fire({
      heightAuto: false,
      title: '¿Cerrar Sesión?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logOut().then(() => this.router.navigateByUrl('/login'));
      }
    });
  }
}
