import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsLayoutComponent } from './emails-layout.component';

describe('EmailsLayoutComponent', () => {
  let component: EmailsLayoutComponent;
  let fixture: ComponentFixture<EmailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
