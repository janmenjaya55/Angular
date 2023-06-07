import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportxlComponent } from './exportxl.component';

describe('ExportxlComponent', () => {
  let component: ExportxlComponent;
  let fixture: ComponentFixture<ExportxlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportxlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportxlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
