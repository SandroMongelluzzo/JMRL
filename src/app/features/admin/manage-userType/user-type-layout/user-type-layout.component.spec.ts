import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeLayoutComponent } from './user-type-layout.component';

describe('UserTypeLayoutComponent', () => {
  let component: UserTypeLayoutComponent;
  let fixture: ComponentFixture<UserTypeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypeLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
