import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostesReactionComponent } from './update-postes-reaction.component';

describe('UpdatePostesReactionComponent', () => {
  let component: UpdatePostesReactionComponent;
  let fixture: ComponentFixture<UpdatePostesReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePostesReactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePostesReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
