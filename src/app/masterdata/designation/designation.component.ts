import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { MasterdataserviceService } from '../masterdataservice.service';


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  desigForm = new FormGroup({});
  allData: any;
  desigPkey: string = '';
  submitted = false;
  create:boolean =true;
  inputJson = new BehaviorSubject({});
  constructor(
    private formBuilder: FormBuilder,
   
    private _router: Router,
    private _route: Router,
  
    private _master: MasterdataserviceService) {
  }

  ngOnInit() {
    this.desigList()
    this.desigForm = this.formBuilder.group({
      desig: ['']
    });
  }

  onSubmitEntryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.desigForm.invalid) {
      return;
    }
    let postData = {
      userDegn: this.desigForm.value.desig.trim()
    };

    this._master.addDesig(postData).subscribe((res:any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Designation Created Successfully",
        popClass: "alert alert-success",
        popRoute: ""
      });
      this.resetDesigForm();
      this.desigList();
    }, (err:any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Something went wrong",
        popClass: "alert alert-danger",
        popRoute: ""
      })
    });
  }

  resetDesigForm() {
    this.create = true;
    this.desigForm.reset();
  }

  desigList() {
    this._master.alldesigList().subscribe((res:any) => {
      this.allData =  res["data"];
    })
  }

  updateDesig(selectedObj:any) {
    this.desigPkey = selectedObj.degnId
    this.desigForm.get('desig')?.setValue(selectedObj.userDegn);
    this.create = false;
  }

  onUpdateForm() {
    if (this.desigForm.invalid) {
      return;
    }
    let putData = {
      userDegn: this.desigForm.value.desig.trim(),
      degnId: this.desigPkey
    };
    this._master.updateDesig(putData).subscribe((res:any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Designation Updated Successfully",
        popClass: "alert alert-success",
        popRoute: ""
      });
      this.create = true;
      this.resetDesigForm();
      this.desigList();
    }, (err:any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Something went wrong",
        popClass: "alert alert-danger",
        popRoute: ""
      })
    });
  }
}