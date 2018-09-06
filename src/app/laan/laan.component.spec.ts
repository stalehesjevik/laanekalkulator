import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaanComponent } from './laan.component';

describe('LaanComponent', () => {
  let component: LaanComponent;
  let fixture: ComponentFixture<LaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
