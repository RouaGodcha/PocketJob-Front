import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployerComponent } from './dashboard-employer.component';

describe('DashboardEmployerComponent', () => {
  let component: DashboardEmployerComponent;
  let fixture: ComponentFixture<DashboardEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
