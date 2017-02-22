import { Component, OnInit } from '@angular/core';
import {VoteService} from "../../services/vote.service";
import {Candidate} from "../../models/candidate";
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css']
})
export class CreateNewListComponent implements OnInit {

  newListForm: FormGroup;
  candidates: Candidate[] = [];
  defaultImageSource = "http://placehold.it/88x95";
  imgSource = this.defaultImageSource;

  validationMessages = {
    name: {
      required: "请输入姓名.",
      maxlength: "名字最长为8个字符."
    },
    thoughts: {
      maxlength: "宣言最长为255个字符."
    },
    number: {
      numberDuplicate: "参加者编号重复."
    }
  };

  //TODO: add flash message to show validation.

  constructor(
    private voteService: VoteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newListForm = this.buildForm();
  }

  ngOnInit() {
  }

// Mark: Form functions
  buildForm(): FormGroup {
    const form = this.formBuilder.group({
      name: [
        "",[
          Validators.required,
          Validators.maxLength(8)
        ]
      ],
      number: [
        0, [
          Validators.required,
          this.numberDuplicatValidator(this.candidates)
        ]
      ],
      thoughts: [
        "", [
          Validators.maxLength(255)
        ]
      ]
    });
    form.valueChanges.subscribe(data=>this.onFormValueChange(data));
    return form;
  }

  numberDuplicatValidator(candidates: Candidate[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const match = candidates.filter(existing => (existing.number == control.value));
      return match.length != 0 ? {'numberDuplicate': 'Number duplicated'} : null;
    };
  }


  onFormValueChange(data?: any) {

    console.log(this.newListForm);
  }

  public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e : any) => this.imgSource = e.target.result;;
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
// End: Form functions

// Mark: Vote creation functions
  public addToStage(e) {
    e.preventDefault();
    if(!this.newListForm.valid) { return; }

    const name = this.newListForm.get("name").value;
    const thoughts = this.newListForm.get("thoughts").value;
    const number = this.newListForm.get("number").value;
    const newCandidate = {
      name: name,
      number: number,
      listId: "",
      thoughts: thoughts,
      imageFileString: this.imgSource,
      upCount: 0
    };
    this.newListForm.get("name").setValue("");
    this.newListForm.get("thoughts").setValue("");
    this.newListForm.get("number").setValue( +number + 1);
    this.imgSource = this.defaultImageSource;

    this.candidates.push(newCandidate);
    this.newListForm.controls["number"].updateValueAndValidity();
  }

  public clear() {
    this.candidates.length = 0;
    this.newListForm.get("number").setValue(0);
    this.newListForm.controls["number"].updateValueAndValidity();
  }

  public commit() {
    this.voteService.promiseToCreateVote("", "", this.candidates).then((res)=>{
      this.router.navigateByUrl("/list/" + res.listId);
    });
  }
// End: Vote creation functions
}
