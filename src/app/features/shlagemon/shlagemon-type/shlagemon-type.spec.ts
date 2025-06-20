import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Type } from './shlagemon-type';

describe('Type', () => {
  let component: Type;
  let fixture: ComponentFixture<Type>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Type]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Type);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
