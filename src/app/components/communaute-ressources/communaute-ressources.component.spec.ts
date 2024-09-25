import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunauteRessourcesComponent } from './communaute-ressources.component';

describe('CommunauteRessourcesComponent', () => {
  let component: CommunauteRessourcesComponent;
  let fixture: ComponentFixture<CommunauteRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunauteRessourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunauteRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
