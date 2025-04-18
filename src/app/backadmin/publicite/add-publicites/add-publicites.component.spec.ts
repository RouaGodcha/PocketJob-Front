import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicitesComponent } from './add-publicites.component';

describe('AddPublicitesComponent', () => {
  let component: AddPublicitesComponent;
  let fixture: ComponentFixture<AddPublicitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPublicitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPublicitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
