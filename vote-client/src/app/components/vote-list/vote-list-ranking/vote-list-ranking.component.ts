import {Component, Input} from '@angular/core';
import {VoteService} from "../../../services/vote.service";
import {List} from "../../../models/list";

@Component({
  selector: 'app-vote-list-ranking',
  templateUrl: './vote-list-ranking.component.html',
  styleUrls: ['./vote-list-ranking.component.css']
})
export class VoteListRankingComponent {

  @Input() list: List;

  constructor(
    private voteService: VoteService,
  ) { }

  upVote(num: number) {
    this.voteService.promiseToUpVote(this.list.listId, num)
      .then(()=>{
        this.list.listCandidates.find((ele)=>(ele.number == num)).upCount += 1;
      }).catch((error)=>{
      console.log(error);
    });
  }

  testClick() {
    console.log(this.list);
  }
}
