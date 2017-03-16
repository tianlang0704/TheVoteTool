import { Component, OnInit } from '@angular/core';
import { VoteService } from "../../services/vote.service";
import { ActivatedRoute } from "@angular/router";
import { List } from "../../models/list";

@Component({
  selector: 'app-vote-list',
  templateUrl: 'vote-list.component.html',
  styleUrls: ['vote-list.component.css']
})
export class VoteListComponent implements OnInit {
  public static routeString = "list/:listId";

  listNav = "info";
  list: List;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const listId = params["listId"];
      if(listId) { this.updateList(listId); }
    });
  }

  updateList(listId): void {
    this.voteService.promiseToGetList(listId)
    .then((result) => {
      this.list = result.list;
    }).catch((error) => {
      console.log(error);
    });
  }
}
