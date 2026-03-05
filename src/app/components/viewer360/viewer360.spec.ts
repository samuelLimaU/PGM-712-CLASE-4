import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewer360 } from './viewer360';

describe('Viewer360', () => {
  let component: Viewer360;
  let fixture: ComponentFixture<Viewer360>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewer360]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewer360);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
