import {
  Directive, Input, HostBinding, HostListener, Output, EventEmitter, Self, ElementRef
} from '@angular/core';

@Directive({ selector: '[btnRadio][btnRadioModel]' })
export class ButtonRadio {
  @Input() private btnRadio:string;
  @Input() private btnRadioModel:string;
  @Output() private btnRadioModelChange = new EventEmitter<string>();

  @HostBinding('class.active')
  private get isActive() {
    return this.btnRadio === this.btnRadioModel;
  }

  @HostListener('click')
  private onClick() {
    this.btnRadioModel = this.btnRadio;
    this.btnRadioModelChange.emit(this.btnRadio);
  }

  constructor() { }
}
