import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsEmployerComponent } from './conversations-employer.component';

describe('ConversationsEmployerComponent', () => {
  let component: ConversationsEmployerComponent;
  let fixture: ComponentFixture<ConversationsEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversationsEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationsEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
