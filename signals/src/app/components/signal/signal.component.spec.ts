import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalComponent } from './signal.component';
import { SimpleChange } from '@angular/core';

describe('SignalComponent', () => {
  let component: SignalComponent;
  let fixture: ComponentFixture<SignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testando função de soma 1 + 1', () => {
    expect(component.sum(1, 1)).toEqual(2);
  });

  it('testando função de soma 0 + 0 = 2 (falsy)', () => {
    expect(component.sum(0, 0)).not.toEqual(2);
  });

  it('shoudl add() function exists', () => {
    expect(component.add()).toBeTruthy();
  });

  it('should updateName() function exists', () => {
    expect(component.updateName()).toBeTruthy();
  });

  it('should updateArray() function exists', () => {
    expect(component.updateArray()).toBeTruthy();
  });
});
