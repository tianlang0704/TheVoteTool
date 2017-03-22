import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { VoteListComponent } from "../vote-list/vote-list.component";
import { CreateNewListComponent } from "../create-new-list/create-new-list.component";
import { VoteService } from "../../services/vote.service";
import Timer = NodeJS.Timer;
import {EM} from "../common/error-matcher";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public static routeString = "menu";

  private error: string;
  private errorTimer: Timer;
  constructor(
    private router: Router,
    private voteService: VoteService
  ) { }

  ngOnInit() {
  }

  showError(error: string, duration: number) {
    this.error = error;
    if(this.errorTimer) {
      clearTimeout(this.errorTimer);
    }
    this.errorTimer = setTimeout(()=>{
      this.error = null;
      this.errorTimer = null;
    }, duration);
  }

  viewList(listId: string) {
    if(!listId) { this.showError(EM.match(EM.listMustNotBeEmpty, EM.CNSim), 2000); return; }
    this.voteService.promiseToCheckListExist(listId)
    .then((resJSON) => {
      if(resJSON.exist) {
        this.router.navigateByUrl(VoteListComponent.routeBase + "/" + listId);
      }
    }).catch((errorJSON) => {
      if(errorJSON.error) {
        this.showError(errorJSON.error, 2000);
      }
    });
  }

  createVote() {
    this.router.navigateByUrl(CreateNewListComponent.routeString);
  }
}
