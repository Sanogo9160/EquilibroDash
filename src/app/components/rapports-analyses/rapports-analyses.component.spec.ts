import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsAnalysesComponent } from './rapports-analyses.component';

describe('RapportsAnalysesComponent', () => {
  let component: RapportsAnalysesComponent;
  let fixture: ComponentFixture<RapportsAnalysesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportsAnalysesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
