import { TestBed } from '@angular/core/testing';

import { DataKelasService } from './data-kelas.service';

describe('DataKelasService', () => {
  let service: DataKelasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataKelasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
