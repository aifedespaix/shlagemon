import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceDialog } from './choice-dialog';

describe('ChoiceDialog', () => {
  let component: ChoiceDialog;
  let fixture: ComponentFixture<ChoiceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
