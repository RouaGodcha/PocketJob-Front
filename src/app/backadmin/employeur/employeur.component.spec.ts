import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeurComponent } from './employeur.component';

describe('EmployeurComponent', () => {
  let component: EmployeurComponent;
  let fixture: ComponentFixture<EmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
