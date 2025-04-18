import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatComponent } from './view-candidat.component';

describe('ViewCandidatComponent', () => {
  let component: ViewCandidatComponent;
  let fixture: ComponentFixture<ViewCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
