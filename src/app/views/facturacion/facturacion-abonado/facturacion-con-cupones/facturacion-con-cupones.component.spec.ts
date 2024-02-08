import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionConCuponesComponent } from './facturacion-con-cupones.component';

describe('FacturacionConCuponesComponent', () => {
  let component: FacturacionConCuponesComponent;
  let fixture: ComponentFixture<FacturacionConCuponesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturacionConCuponesComponent]
    });
    fixture = TestBed.createComponent(FacturacionConCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
