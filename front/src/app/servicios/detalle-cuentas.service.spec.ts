import { TestBed } from '@angular/core/testing';

import { DetalleCuentasService } from './detalle-cuentas.service';

describe('DetalleCuentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetalleCuentasService = TestBed.get(DetalleCuentasService);
    expect(service).toBeTruthy();
  });
});
