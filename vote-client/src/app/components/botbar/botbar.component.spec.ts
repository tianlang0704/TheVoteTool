/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BotbarComponent } from './botbar.component';

describe('BotbarComponent', () => {
  let component: BotbarComponent;
  let fixture: ComponentFixture<BotbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
