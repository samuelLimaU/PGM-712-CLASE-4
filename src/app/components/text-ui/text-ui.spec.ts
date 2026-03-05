import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextUI } from './text-ui';

describe('TextUI', () => {
  let component: TextUI;
  let fixture: ComponentFixture<TextUI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextUI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextUI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
