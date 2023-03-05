import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiurlComponent } from './apiurl.component';

describe('ApiurlComponent', () => {
  let component: ApiurlComponent;
  let fixture: ComponentFixture<ApiurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
