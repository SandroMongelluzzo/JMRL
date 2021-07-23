import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTicketUserComponent } from './read-ticket-user.component';

describe('ReadTicketUserComponent', () => {
  let component: ReadTicketUserComponent;
  let fixture: ComponentFixture<ReadTicketUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTicketUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTicketUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
