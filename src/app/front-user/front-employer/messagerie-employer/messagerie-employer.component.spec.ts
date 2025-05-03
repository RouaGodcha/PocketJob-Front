import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagerieEmployerComponent } from './messagerie-employer.component';

describe('MessagerieEmployerComponent', () => {
  let component: MessagerieEmployerComponent;
  let fixture: ComponentFixture<MessagerieEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagerieEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagerieEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
