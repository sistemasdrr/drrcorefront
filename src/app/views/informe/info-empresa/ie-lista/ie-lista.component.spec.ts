import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEListaComponent } from './ie-lista.component';

describe('IEListaComponent', () => {
  let component: IEListaComponent;
  let fixture: ComponentFixture<IEListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IEListaComponent]
    });
    fixture = TestBed.createComponent(IEListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
