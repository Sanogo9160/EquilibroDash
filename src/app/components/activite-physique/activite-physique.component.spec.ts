import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitePhysiqueComponent } from './activite-physique.component';

describe('ActivitePhysiqueComponent', () => {
  let component: ActivitePhysiqueComponent;
  let fixture: ComponentFixture<ActivitePhysiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitePhysiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
