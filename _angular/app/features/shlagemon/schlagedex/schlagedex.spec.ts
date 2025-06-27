import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Schlagedex } from './schlagedex';

describe('Schlagedex', () => {
  let component: Schlagedex;
  let fixture: ComponentFixture<Schlagedex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Schlagedex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Schlagedex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
