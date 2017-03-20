import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {VoteListComponent} from "../vote-list/vote-list.component";
import {CreateNewListComponent} from "../create-new-list/create-new-list.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public static routeString = "menu";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewList(listId: string) {
    if(!listId) { return; }
    console.log(listId);
    this.router.navigateByUrl(VoteListComponent.routeBase + "/" + listId);
  }

  createVote() {
    this.router.navigateByUrl(CreateNewListComponent.routeString);
  }
}
