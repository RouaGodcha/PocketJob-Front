import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidatComponent } from './update-candidat.component';

describe('UpdateCandidatComponent', () => {
  let component: UpdateCandidatComponent;
  let fixture: ComponentFixture<UpdateCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
