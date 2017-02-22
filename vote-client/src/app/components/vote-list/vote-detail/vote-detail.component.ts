import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { VoteService } from "../../../services/vote.service";
import { Candidate } from "../../../models/candidate";


@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.css']
})
export class VoteDetailComponent implements OnInit {
  public static routeString = "detail/:listId/:number"

  public candidate: Candidate = null;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe((params) => {
      this.voteService.promiseToGetCandidate(params["listId"], params["number"])
        .then((cand) => {
          console.log(cand);
          this.candidate = cand;
        }).catch((error)=>{
          //TODO: show message
          console.log(error);
      });
    });
  }

  ngOnInit() {
    document.body.scrollTop = 0;
  }

  upVote(num: number) {
    this.voteService.promiseToUpVote(this.candidate.listId, this.candidate.number)
      .then(()=>this.candidate.upCount += 1)
      .catch((error)=>{
        console.log(error);
      });
  }

  goBack() {
    this.location.back();
  }

}
