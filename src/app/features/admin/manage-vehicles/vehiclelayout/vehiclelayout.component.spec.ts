import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclelayoutComponent } from './vehiclelayout.component';

describe('VehiclelayoutComponent', () => {
  let component: VehiclelayoutComponent;
  let fixture: ComponentFixture<VehiclelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclelayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
