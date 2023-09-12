import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeDetalleComponent } from './ie-detalle.component';

describe('IeDetalleComponent', () => {
  let component: IeDetalleComponent;
  let fixture: ComponentFixture<IeDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IeDetalleComponent]
    });
    fixture = TestBed.createComponent(IeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
