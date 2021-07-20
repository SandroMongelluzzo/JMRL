import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandroneComponent } from './sandrone.component';

describe('SandroneComponent', () => {
  let component: SandroneComponent;
  let fixture: ComponentFixture<SandroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandroneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
