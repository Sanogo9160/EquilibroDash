import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDeSanteComponent } from './profil-de-sante.component';

describe('ProfilDeSanteComponent', () => {
  let component: ProfilDeSanteComponent;
  let fixture: ComponentFixture<ProfilDeSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilDeSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilDeSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
