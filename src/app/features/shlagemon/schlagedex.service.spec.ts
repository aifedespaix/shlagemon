import { TestBed } from '@angular/core/testing';
import { SchlagedexService } from './schlagedex.service';

describe('SchlagedexService', () => {
  let service: SchlagedexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchlagedexService);
  });

  it('should create and store a shlagemon', () => {
    const base = { id: 'schlartichaut', name: 'Schlartichaut', color: '', description: '', type: 'Slope' } as any;
    service.createShlagemon(base);
    const mons = service.getShlagemons();
    expect(mons.length).toBe(1);
    expect(mons[0].name).toBe('Schlartichaut');
    expect(mons[0].hp).toBeGreaterThan(0);
  });
});
