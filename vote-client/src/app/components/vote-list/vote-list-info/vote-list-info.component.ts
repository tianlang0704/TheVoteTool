import {Component, OnInit, Input} from '@angular/core';
import {List} from "../../../models/list";

@Component({
  selector: 'app-vote-list-info',
  templateUrl: './vote-list-info.component.html',
  styleUrls: ['./vote-list-info.component.css']
})
export class VoteListInfoComponent implements OnInit {

  @Input() list: List;

  constructor() { }

  ngOnInit() {
  }

}
