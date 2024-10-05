import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationRepasComponent } from './planification-repas.component';

describe('PlanificationRepasComponent', () => {
  let component: PlanificationRepasComponent;
  let fixture: ComponentFixture<PlanificationRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificationRepasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificationRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
