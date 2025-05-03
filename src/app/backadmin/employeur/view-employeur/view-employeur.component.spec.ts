import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeurComponent } from './view-employeur.component';

describe('ViewEmployeurComponent', () => {
  let component: ViewEmployeurComponent;
  let fixture: ComponentFixture<ViewEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmployeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
