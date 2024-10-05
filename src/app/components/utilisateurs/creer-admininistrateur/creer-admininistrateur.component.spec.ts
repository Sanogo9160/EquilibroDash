import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerAdmininistrateurComponent } from './creer-admininistrateur.component';

describe('CreerAdmininistrateurComponent', () => {
  let component: CreerAdmininistrateurComponent;
  let fixture: ComponentFixture<CreerAdmininistrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerAdmininistrateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerAdmininistrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
