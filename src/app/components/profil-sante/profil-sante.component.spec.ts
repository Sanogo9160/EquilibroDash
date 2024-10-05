import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSanteComponent } from './profil-sante.component';

describe('ProfilSanteComponent', () => {
  let component: ProfilSanteComponent;
  let fixture: ComponentFixture<ProfilSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
