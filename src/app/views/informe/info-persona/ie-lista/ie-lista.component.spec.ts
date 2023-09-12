import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeListaComponent } from './ie-lista.component';

describe('IeListaComponent', () => {
  let component: IeListaComponent;
  let fixture: ComponentFixture<IeListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IeListaComponent]
    });
    fixture = TestBed.createComponent(IeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
