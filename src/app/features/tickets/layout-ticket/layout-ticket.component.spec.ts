import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutTicketComponent } from './layout-ticket.component';

describe('LayoutTicketComponent', () => {
  let component: LayoutTicketComponent;
  let fixture: ComponentFixture<LayoutTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});