import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDiscussionComponent } from './voir-discussion.component';

describe('VoirDiscussionComponent', () => {
  let component: VoirDiscussionComponent;
  let fixture: ComponentFixture<VoirDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoirDiscussionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoirDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
