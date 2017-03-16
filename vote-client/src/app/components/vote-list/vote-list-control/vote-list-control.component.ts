import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-vote-list-control',
  templateUrl: './vote-list-control.component.html',
  styleUrls: ['./vote-list-control.component.css']
})
export class VoteListControlComponent implements OnInit {
  @Output() currentNavOptionChange = new EventEmitter<string>();

  _btnRadioModel: string;
  get btnRadioModel(): string {
    return this._btnRadioModel;
  }
  @Input("currentNavOption")
  set btnRadioModel(value) {
    this._btnRadioModel = value;
    this.currentNavOptionChange.emit(this._btnRadioModel);
  }

  label1: string;

  test() {
    console.log(this.label1);
  }

  constructor() { }

  ngOnInit() { }

}
