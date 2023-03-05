import { Component, OnInit } from '@angular/core';



import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MasterdataserviceService } from '../masterdataservice.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  deptForm = new FormGroup({});
  allData: any;
  deptPkey: string = '';
  submitted = false;
  create: boolean = true;
  inputJson = new BehaviorSubject({});
  constructor(
    private formBuilder: FormBuilder,

    private _router: Router,
    private _route: Router,

    private _master: MasterdataserviceService) {
  }

  ngOnInit() {
    this.deptList()
    this.deptForm = this.formBuilder.group({
      deptName: ['']
    });
  }

  onSubmitEntryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.deptForm.invalid) {
      return;
    }
    let postData = {
      userDept: this.deptForm.value.deptName.trim()
    };
    this._master.addDept(postData).subscribe((res: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Department Created Successfully",
        popClass: "alert alert-success",
        popRoute: ""
      });
      this.resetDeptForm();
      this.deptList();
    }, (err: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Something went wrong",
        popClass: "alert alert-danger",
        popRoute: ""
      })
    });
  }

  resetDeptForm() {
    this.create = true;
    this.deptForm.reset();
  }

  deptList() {
    this._master.alldeptList().subscribe((res: any) => {
      this.allData = res["data"];
      console.log("dept data>>>>>>>>>>>>>>>>" + this.allData.value)
    })
  }



  updateDepartment(selectedObj: any) {
    if (selectedObj != null) {
      this.deptPkey = selectedObj.deptId;
      //this.deptForm.get('deptName').setValue(selectedObj.userDept);
      this.deptForm.get('deptName')?.setValue(selectedObj.userDept);
      this.create = false;
    } else {
      this.create = true;
    }

  }

  onUpdateForm() {
    if (this.deptForm.invalid) {
      return;
    }
    let putData = {
      userDept: this.deptForm.value.deptName.trim(),
      deptId: this.deptPkey
    };
    this._master.updateDept(putData).subscribe((res: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Department Updated Successfully",
        popClass: "alert alert-success",
        popRoute: ""
      });
      this.create = true;
      this.resetDeptForm();
      this.deptList();
    }, (err: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Something went wrong",
        popClass: "alert alert-danger",
        popRoute: ""
      })
    });
  }
}