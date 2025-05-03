import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsEmployerComponent } from './candidats-employer.component';

describe('CandidatsEmployerComponent', () => {
  let component: CandidatsEmployerComponent;
  let fixture: ComponentFixture<CandidatsEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatsEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatsEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
