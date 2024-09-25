import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeExerciceComponent } from './programme-exercice.component';

describe('ProgrammeExerciceComponent', () => {
  let component: ProgrammeExerciceComponent;
  let fixture: ComponentFixture<ProgrammeExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeExerciceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
