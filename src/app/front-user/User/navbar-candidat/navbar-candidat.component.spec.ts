import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCandidatComponent } from './navbar-candidat.component';

describe('NavbarCandidatComponent', () => {
  let component: NavbarCandidatComponent;
  let fixture: ComponentFixture<NavbarCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
