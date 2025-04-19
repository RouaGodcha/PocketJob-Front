import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicitesComponent } from './update-publicites.component';

describe('UpdatePublicitesComponent', () => {
  let component: UpdatePublicitesComponent;
  let fixture: ComponentFixture<UpdatePublicitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePublicitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePublicitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
