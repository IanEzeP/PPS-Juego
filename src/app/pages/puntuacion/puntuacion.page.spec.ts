import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntuacionPage } from './puntuacion.page';

describe('PuntuacionPage', () => {
  let component: PuntuacionPage;
  let fixture: ComponentFixture<PuntuacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
