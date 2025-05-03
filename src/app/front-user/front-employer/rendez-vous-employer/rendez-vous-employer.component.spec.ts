import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousEmployerComponent } from './rendez-vous-employer.component';

describe('RendezVousEmployerComponent', () => {
  let component: RendezVousEmployerComponent;
  let fixture: ComponentFixture<RendezVousEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RendezVousEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezVousEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
