import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviNutritionnelComponent } from './suivi-nutritionnel.component';

describe('SuiviNutritionnelComponent', () => {
  let component: SuiviNutritionnelComponent;
  let fixture: ComponentFixture<SuiviNutritionnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviNutritionnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviNutritionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
