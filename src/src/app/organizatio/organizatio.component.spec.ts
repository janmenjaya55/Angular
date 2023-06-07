import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatioComponent } from './organizatio.component';

describe('OrganizatioComponent', () => {
  let component: OrganizatioComponent;
  let fixture: ComponentFixture<OrganizatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
