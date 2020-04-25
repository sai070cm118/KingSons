import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleroutesComponent } from './userroleroutes.component';

describe('UserroleroutesComponent', () => {
  let component: UserroleroutesComponent;
  let fixture: ComponentFixture<UserroleroutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleroutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleroutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
