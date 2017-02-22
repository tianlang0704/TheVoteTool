import { Component, OnInit, Input } from '@angular/core';
import { VoteService } from "../../services/vote.service";
import { Candidate } from "../../models/candidate";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-vote-list',
  templateUrl: 'vote-list.component.html',
  styleUrls: ['vote-list.component.css']
})
export class VoteListComponent implements OnInit {

  @Input() candidates: Candidate[];
  listId: string;

  constructor(
    private voteService: VoteService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params)=>{
      this.listId = params["listId"];
      if(this.listId) {
        this.updateList();
      }
    });
  }

  ngOnInit() {

  }

  updateList(): void {
    this.voteService.promiseToGetList(this.listId)
      .then((list) => {
        this.candidates = list.listCandidates;
      });
  }

  upVote(num: number) {
    this.voteService.promiseToUpVote(this.listId, num)
      .then(()=>{
        this.candidates.find((ele)=>(ele.number == num)).upCount += 1;
      }).catch((error)=>{
        console.log(error);
    });
  }
}
