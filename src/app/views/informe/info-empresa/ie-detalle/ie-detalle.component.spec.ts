import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEDetalleComponent } from './ie-detalle.component';

describe('IEDetalleComponent', () => {
  let component: IEDetalleComponent;
  let fixture: ComponentFixture<IEDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IEDetalleComponent]
    });
    fixture = TestBed.createComponent(IEDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
