import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTicketByUserComponent } from './new-ticket-by-user.component';

describe('NewTicketByUserComponent', () => {
  let component: NewTicketByUserComponent;
  let fixture: ComponentFixture<NewTicketByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTicketByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicketByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
