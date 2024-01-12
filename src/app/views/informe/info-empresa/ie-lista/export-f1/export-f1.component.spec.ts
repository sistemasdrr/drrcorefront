import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportF1Component } from './export-f1.component';

describe('ExportF1Component', () => {
  let component: ExportF1Component;
  let fixture: ComponentFixture<ExportF1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportF1Component]
    });
    fixture = TestBed.createComponent(ExportF1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
