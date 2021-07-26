import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaLayoutComponent } from './sla-layout.component';

describe('SlaLayoutComponent', () => {
  let component: SlaLayoutComponent;
  let fixture: ComponentFixture<SlaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
