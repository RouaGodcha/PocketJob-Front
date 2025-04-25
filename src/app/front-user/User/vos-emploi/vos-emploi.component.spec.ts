import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VosEmploiComponent } from './vos-emploi.component';

describe('VosEmploiComponent', () => {
  let component: VosEmploiComponent;
  let fixture: ComponentFixture<VosEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VosEmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VosEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
