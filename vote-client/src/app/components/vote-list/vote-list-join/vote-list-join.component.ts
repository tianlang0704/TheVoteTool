import {Component, OnInit, Input} from '@angular/core';
import {List} from "../../../models/list";
import {VoteService} from "../../../services/vote.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vote-list-join',
  templateUrl: './vote-list-join.component.html',
  styleUrls: ['./vote-list-join.component.css']
})
export class VoteListJoinComponent implements OnInit {

  @Input() list: List;

  constructor(
    private voteService: VoteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newListForm = this.buildForm();
  }

  ngOnInit() {
  }

// Mark: =============================== Form functions
  imgSource: string = "http://placehold.it/88x95";

  public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e : any) => this.imgSource = e.target.result;;
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  newListForm: FormGroup;

  buildForm(): FormGroup {
    const form = this.formBuilder.group({
      candidateName: [
        "",[
          Validators.required,
          Validators.maxLength(8)
        ]
      ],
      candidateThoughts: [
        "", [
          Validators.maxLength(255)
        ]
      ]
    });
    form.valueChanges.subscribe(()=>(this.formErrors = this.buildFormErrors(this.newListForm, this.validationMessages)));
    return form;
  }

  validationMessages = {
    candidateName: {
      required: "请输入姓名.",
      maxlength: "姓名最长为8个字符."
    },
    candidateThoughts: {
      maxlength: "宣言最长为255个字符."
    }
  };

  formErrors = {};
  buildFormErrors(form: FormGroup, validationMessages: any): any {
    if (!form || !form.controls) { return; }
    const formErrors: any = {};
    for (const controlName in form.controls) {
      // clear previous error message (if any)

      formErrors[controlName] = '';
      const control = form.get(controlName);
      if (control && !control.valid) {
        const messages = validationMessages[controlName];
        for (const key in control.errors) {
          formErrors[controlName] += messages[key] + ' ';
        }
      }
    }
    return formErrors;
  }

  commit() {
    if(!this.newListForm.valid) {
      return
    }

    const name = this.newListForm.get("candidateName").value;
    const thoughts = this.newListForm.get("candidateThoughts").value;
    const imageFileString = this.imgSource;

    this.voteService.promiseToJoinVote(
      this.list.listId,
      name,
      thoughts,
      imageFileString
    ).then((res)=>{
      this.router.navigateByUrl("/detail/" + res.listId + "/" + res.candidateNumber);
    }, (error)=>{
      console.log(error);
      //TODO: Show message;
    });
  }
// End: =============================== Vote creation functions
}
