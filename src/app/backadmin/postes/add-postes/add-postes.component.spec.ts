import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostesComponent } from './add-postes.component';

describe('AddPostesComponent', () => {
  let component: AddPostesComponent;
  let fixture: ComponentFixture<AddPostesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
