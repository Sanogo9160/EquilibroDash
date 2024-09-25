import { TestBed } from '@angular/core/testing';

import { ProfilDeSanteService } from './profil-de-sante.service';

describe('ProfilDeSanteService', () => {
  let service: ProfilDeSanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilDeSanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
