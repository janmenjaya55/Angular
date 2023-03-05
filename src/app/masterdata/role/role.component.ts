import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MasterdataserviceService } from '../masterdataservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleForm = new FormGroup({});
  allData: any;
  submitted = false;
  rolePkey: string = '';
  create: boolean = true;
  inputJson = new BehaviorSubject({});
  constructor(
    private formBuilder: FormBuilder,

    private _router: Router,
    private _route: Router,

    private _master: MasterdataserviceService) {
  }

  ngOnInit() {
    this.roleList()
    this.roleForm = this.formBuilder.group({
      roleName: ['']
    });
  }

  onSubmitForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.roleForm.invalid) {
      return;
    }
    let postData = {
      userRole: this.roleForm.value.roleName.trim()
    };
    this._master.addRole(postData).subscribe((res: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Role Created Successfully",
        popClass: "alert alert-success",
        popRoute: ""
      });
      this.resetRoleForm();
      this.roleList();
    }, (err: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Something went wrong",
        popClass: "alert alert-danger",
        popRoute: ""
      })
    });
  }

  resetRoleForm() {
    this.roleForm.reset();
  }

  closeUsersForm() {
    this.create = true;
    this.roleForm.reset();
  }

  roleList() {
    this._master.allroleList().subscribe((res: any) => {
      this.allData = res["data"];
    })
  }

  updateRole(selectedArray: any) {
    this.rolePkey = selectedArray.roleId
    this.create = false;
    this.roleForm.get('roleName')?.setValue(selectedArray.userRole);
  }

  onUpdateForm() {
    if (this.roleForm.invalid) {
      return;
    }
    let putData = {
      userRole: this.roleForm.value.roleName.trim(),
      roleId: this.rolePkey
    };
    this._master.updateRole(putData).subscribe((response: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Role Updated Successfully",
        popClass: "alert alert-success",
        popRoute: ""
      });
      this.create = true;
      this.resetRoleForm();
      this.roleList();
    }, (error: any) => {
      this.inputJson.next({
        popShow: true,
        popMsg: "Something went wrong",
        popClass: "alert alert-danger",
        popRoute: ""
      })
    });
  }
}
