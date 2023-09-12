import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGerenciaComponent } from './dash-gerencia.component';

describe('DashGerenciaComponent', () => {
  let component: DashGerenciaComponent;
  let fixture: ComponentFixture<DashGerenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashGerenciaComponent]
    });
    fixture = TestBed.createComponent(DashGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
