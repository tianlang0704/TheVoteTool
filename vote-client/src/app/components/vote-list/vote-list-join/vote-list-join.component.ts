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

// Mark: =============================== Image functions
  imgSource: string = "http://placehold.it/88x95";
  imgError: string;
  public fileChangeEvent(fileInput: any){
    if (!fileInput.target.files || !fileInput.target.files[0]) { return; }
    this.imgError = null;
    const reader = new FileReader();
    reader.onload = (e : any) => {
      this.promiseToResizeDataURL(e.target.result, 350, 350)
      .then((res) => {
        this.imgSource = res;
      });
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  public promiseToResizeDataURL(datas, maxWidth, maxHeight): Promise<string>
  {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = function()
      {
        // Calculate wanted width and height based on max width and height
        let wantedHeight, wantedWidth;
        if(img.width <= maxWidth && img.height <= maxHeight) {
          wantedWidth = img.width;
          wantedHeight = img.height;
        }else if(img.width > img.height) {
          wantedWidth = maxWidth;
          wantedHeight = wantedWidth * img.height / img.width
        }else{
          wantedHeight = maxHeight;
          wantedWidth = wantedHeight * img.width / img.height;
        }

        // Draw image on canvas based on wanted width and height
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

        // Return image on canvas as data URL
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = datas;
    });
  }
// End: =============================== Image functions

// Mark: =============================== Form functions
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
      // clear previous error message
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
