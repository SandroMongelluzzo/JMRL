import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaAddEditComponent } from './sla-add-edit.component';

describe('SlaAddEditComponent', () => {
  let component: SlaAddEditComponent;
  let fixture: ComponentFixture<SlaAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
