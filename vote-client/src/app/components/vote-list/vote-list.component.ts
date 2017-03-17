import { Component, OnInit } from '@angular/core';
import { VoteService } from "../../services/vote.service";
import {ActivatedRoute, Router} from "@angular/router";
import { List } from "../../models/list";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-vote-list',
  templateUrl: 'vote-list.component.html',
  styleUrls: ['vote-list.component.css']
})
export class VoteListComponent implements OnInit {
  public static routeString1 = "list/:listId/:nav";
  public static routeString2 = "list/:listId";

  listNav:string = "info";
  list: List;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      const listId = params["listId"];
      const navString = params["nav"];
      if(!this.list && listId) { this.updateList(listId); }
      if(navString) { this.listNav = navString; }
    });
  }

  navControlChange(navString) {
    if(navString == this.listNav || !this.list) { return; }
    this.router.navigateByUrl("/list/" + this.list.listId + "/" + navString);
  }

  updateList(listId): void {
    this.voteService.promiseToGetList(listId)
    .then((result) => {
      this.list = result.list;
      this.titleService.setTitle(this.list.listTitle);
    }).catch((error) => {
      console.log(error);
    });
  }
}
