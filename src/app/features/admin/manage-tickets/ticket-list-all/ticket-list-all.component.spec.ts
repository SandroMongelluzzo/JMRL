import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketListAllComponent } from './ticket-list-all.component';

describe('TicketListAllComponent', () => {
  let component: TicketListAllComponent;
  let fixture: ComponentFixture<TicketListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
