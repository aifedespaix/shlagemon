import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShlagemonType } from './shlagemon-type';

describe('ShlagemonType', () => {
  let component: ShlagemonType;
  let fixture: ComponentFixture<ShlagemonType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShlagemonType]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShlagemonType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
