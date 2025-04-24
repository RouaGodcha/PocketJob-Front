import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCandidatComponent } from './sidebar-candidat.component';

describe('SidebarCandidatComponent', () => {
  let component: SidebarCandidatComponent;
  let fixture: ComponentFixture<SidebarCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
