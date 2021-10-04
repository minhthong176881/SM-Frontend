import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTerminalComponent } from './dialog-terminal.component';

describe('DialogTerminalComponent', () => {
  let component: DialogTerminalComponent;
  let fixture: ComponentFixture<DialogTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTerminalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
