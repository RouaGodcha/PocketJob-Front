import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasComponent } from './medias.component';

describe('MediasComponent', () => {
  let component: MediasComponent;
  let fixture: ComponentFixture<MediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
