import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEmployerComponent } from './navbar-employer.component';

describe('NavbarEmployerComponent', () => {
  let component: NavbarEmployerComponent;
  let fixture: ComponentFixture<NavbarEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
