import { Component, OnInit } from '@angular/core';
import {VoteService} from "../../services/vote.service";
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, Form} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.css']
})
export class CreateNewListComponent implements OnInit {
  public static routeString = "new";

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
  newListForm: FormGroup;

  buildForm(): FormGroup {
    const form = this.formBuilder.group({
      listTitle: [
        "",[
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      listDescription: [
        "", [
          Validators.maxLength(1000)
        ]
      ]
    });
    form.valueChanges.subscribe(()=>(this.formErrors = this.buildFormErrors(this.newListForm, this.validationMessages)));
    return form;
  }

  validationMessages = {
    listTitle: {
      required: "请输入标题.",
      maxlength: "标题最长为50个字符."
    },
    listDescription: {
      maxlength: "简介最长为1000个字符."
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
      this.formErrors = this.buildFormErrors(this.newListForm, this.validationMessages);
      return
    }

    const listTitle = this.newListForm.get("listTitle").value;
    const listDescription = this.newListForm.get("listDescription").value;

    this.voteService.promiseToCreateVote(listTitle, listDescription)
    .then((res)=>{
      this.router.navigateByUrl("/list/" + res.listId);
    }, (error)=>{
      console.log(error);
      //TODO: Show message;
    });
  }
// End: =============================== Vote creation functions
}
