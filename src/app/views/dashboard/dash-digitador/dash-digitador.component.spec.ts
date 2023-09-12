import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDigitadorComponent } from './dash-digitador.component';

describe('DashDigitadorComponent', () => {
  let component: DashDigitadorComponent;
  let fixture: ComponentFixture<DashDigitadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashDigitadorComponent]
    });
    fixture = TestBed.createComponent(DashDigitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
