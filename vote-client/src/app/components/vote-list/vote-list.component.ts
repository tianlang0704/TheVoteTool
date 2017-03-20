import { Component, OnInit } from '@angular/core';
import { VoteService } from "../../services/vote.service";
import { ActivatedRoute, Router } from "@angular/router";
import { List } from "../../models/list";
import { Title } from "@angular/platform-browser";
import { VoteListNavOptions } from "./vote-list-control/vote-list-control.component";

@Component({
  selector: 'app-vote-list',
  templateUrl: 'vote-list.component.html',
  styleUrls: ['vote-list.component.css']
})
export class VoteListComponent implements OnInit {
  public static routeBase = "list";
  public static routeIdNav = VoteListComponent.routeBase + "/:listId/:nav";
  public static routeId = VoteListComponent.routeBase + "/:listId";

  // list control component bound property
  listNavOptions = new VoteListNavOptions;
  listNav:string = VoteListNavOptions.INFO;
  // internal list information
  list: List;
  // list error info
  listError: string;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      // Grab list id from param and get info from the server asynchronously
      const listId = params["listId"];
      if(!this.list && listId) { this.updateList(listId); }
      // Grab the initial page param from the query string
      const navString = params["nav"];
      if(navString) { this.listNav = navString; }
    });
  }

  navControlChange(navString) {
    // Important: Check to stop url => listNav => listControl => listNav => url bind loop
    if(navString == this.listNav || !this.list) { return; }
    this.router.navigateByUrl(VoteListComponent.routeBase + "/" + this.list.listId + "/" + navString);
  }

  updateList(listId): void {
    this.voteService.promiseToGetList(listId)
    .then((result) => {
      this.listError = null;
      this.list = result.list;
      this.titleService.setTitle(this.list.listTitle);
    }).catch((error) => {
      this.list = null;
      this.listError = error.error;
      console.log(error);
    });
  }
}
