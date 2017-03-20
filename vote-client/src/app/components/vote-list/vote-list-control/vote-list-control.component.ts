import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

export class VoteListNavOptions {
  public static INFO = "info";
  public static JOIN = "join";
  public static RANKING = "ranking";
  get INFO() { return VoteListNavOptions.INFO; }
  get JOIN() { return VoteListNavOptions.JOIN; }
  get RANKING() { return VoteListNavOptions.RANKING; }
}

@Component({
  selector: 'app-vote-list-control',
  templateUrl: './vote-list-control.component.html',
  styleUrls: ['./vote-list-control.component.css']
})
export class VoteListControlComponent implements OnInit {
  @Output() currentNavOptionChange = new EventEmitter<string>();

  private navOptions = new VoteListNavOptions();
  private _btnRadioModel: string;
  get btnRadioModel(): string {
    return this._btnRadioModel;
  }
  @Input("currentNavOption")
  set btnRadioModel(value) {
    this._btnRadioModel = value;
    this.currentNavOptionChange.emit(this._btnRadioModel);
  }
  @Input()
  set currentNavOptionInputOnly(value) {
    this._btnRadioModel = value;
  }

  constructor() { }

  ngOnInit() { }
}
