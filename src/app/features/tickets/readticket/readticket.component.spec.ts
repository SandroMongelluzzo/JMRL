import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadticketComponent } from './readticket.component';

describe('ReadticketComponent', () => {
  let component: ReadticketComponent;
  let fixture: ComponentFixture<ReadticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
