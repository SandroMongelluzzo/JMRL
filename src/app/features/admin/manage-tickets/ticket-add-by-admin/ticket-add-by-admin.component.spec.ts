import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddByAdminComponent } from './ticket-add-by-admin.component';

describe('TicketAddByAdminComponent', () => {
  let component: TicketAddByAdminComponent;
  let fixture: ComponentFixture<TicketAddByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddByAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
