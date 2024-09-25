import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeRepasComponent } from './plan-de-repas.component';

describe('PlanDeRepasComponent', () => {
  let component: PlanDeRepasComponent;
  let fixture: ComponentFixture<PlanDeRepasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDeRepasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDeRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
