import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsEmployerComponent } from './notifications-employer.component';

describe('NotificationsEmployerComponent', () => {
  let component: NotificationsEmployerComponent;
  let fixture: ComponentFixture<NotificationsEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
