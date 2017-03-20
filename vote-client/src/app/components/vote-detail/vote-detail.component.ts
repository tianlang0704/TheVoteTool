import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

import { VoteService } from "../../services/vote.service";
import { Candidate } from "../../models/candidate";
import { Title } from "@angular/platform-browser";
import { VoteListComponent } from "../vote-list/vote-list.component";
import { VoteListNavOptions } from "../vote-list/vote-list-control/vote-list-control.component";


@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.css']
})
export class VoteDetailComponent implements OnInit {
  public static routeString = "detail/:listId/:number";

  public candidate: Candidate;
  private paramsError: string;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    this.route.params.subscribe((params) => {
      const listId = params["listId"];
      const candidateNumber = params["number"];
      if(!listId || !candidateNumber) {
        this.paramsError = "参数不正确"
      }
      this.paramsError = null;

      this.updateCandidate(listId, candidateNumber);
    });
  }

  ngOnInit() {
    document.body.scrollTop = 0;
  }

  updateCandidate(listId: string, candidateNumber: number) {
    this.voteService.promiseToGetCandidate(listId, candidateNumber)
    .then((result) => {
      console.log(result);
      this.candidate = result.candidate;
      this.titleService.setTitle(this.candidate.name)
    }).catch((error)=>{
      //TODO: show message
      console.log(error);
    });
  }

  upVote(num: number) {
    this.voteService.promiseToUpVote(this.candidate.listId, this.candidate.number)
    .then(()=>this.candidate.upCount += 1)
    .catch((error)=>{
      console.log(error);
    });
  }

  goBack() {
    this.router.navigateByUrl(VoteListComponent.routeBase + "/" + this.candidate.listId + "/" + VoteListNavOptions.RANKING);
  }
}
