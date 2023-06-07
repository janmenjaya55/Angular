import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { UserserviceService } from './userservice.service';
import { BehaviorSubject } from "rxjs";

import { HttpClient } from '@angular/common/http';
import { UploadDocServiceService } from '../upload-document/upload-doc-service.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  deptForm = new FormGroup({});
  inputJson = new BehaviorSubject({});
  allData: any = [];
  deptPkey: string = '';
  docfileName:string='';
  submitted = false;
  create: boolean = true;
  userForm: FormGroup
  roleData: any = [];
  deptData: any = [];
  desigData: any = [];
  show: boolean = false;
  loadingtxt: boolean = false;
  editData: any = {};
  myModal: boolean = false;
 
  
  public user: FormGroup;
  public formData = new FormData
  fileName = '';
  resetflag: boolean=false;
  public tat: any;
  public uploadSubmit = false;
  ReqJson: any = {};
  RequestOptions: any
  parm: any
  selectedFile: any
  fileUploadForm: any
  fileError: any
  fileSelectedToUpload: any
  fileProgress: any
 
  constructor(private _Router: Router, private _userservice: UserserviceService,
    private _router: Router,
      private fb: FormBuilder,
      private http: HttpClient,
      public _uploadDocSer: UploadDocServiceService) {
  }

  ngOnInit() {
    this.user = this.fb.group({
      tat: new FormControl(this.tat, [Validators.required]),

    })
    this.deptList();
    this.desigList();
    this.roleList();
    this.userList();
    this.userForm = new FormGroup({
      username: new FormControl(""),
      loginId: new FormControl(""),
      emailId: new FormControl(""),
      userLevel: new FormControl(""),
      mobNo: new FormControl(""),
      department: new FormControl(""),
      userrole: new FormControl(""),
      designation: new FormControl(""),
      password: new FormControl(""),
      cnfpassword: new FormControl(""),
      filename: new FormControl("")
    


    });
    console.log(2222)


  }

  download(val:any){
    this._uploadDocSer.downloadDocs(val).subscribe((res: any)=>{
      if(res && res.status == 200){
        console.log(res, "#################>>>>>>>>>>>>>>>>..")
      }
      console.log( "Succesfully docs downloaded>>>>>>>>>>>>>>>>")
     
    })


  }

 
  onSubmitEntryForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (this.userForm.value.password !== this.userForm.value.cnfpassword) {
      this.show = true;
      return;
    }
    //If form is valid then create user here
    let postData = {
      fullname: this.userForm.value.username.trim(),
      password: this.userForm.value.password,
      userrole: this.userForm.value.userrole,
      // employId: this.userForm.value.employId.trim(),
      emailId: this.userForm.value.emailId,
      username: this.userForm.value.loginId,
      userLevel: this.userForm.value.userLevel,
      mobNo: Number(this.userForm.value.mobNo),
      designation: this.userForm.value.designation.trim(),
      department: this.userForm.value.department,
      filename:this.docfileName
     
    };
    console.log("filenameM>>>>>>>>>>>>>>>>>>>>",this.docfileName)
    this.show = false;
   
   // if( this.resetflag==true){
      console.log("enter into ad user conditions>>>>>>>>>>>>>>>>>>>>>>")
      this._userservice.addUser(postData).subscribe((res: any) => {

        this.inputJson.next({
          popShow: true,
          popMsg: "User Created Successfully.",
          popClass: "alert alert-success",
          popRoute: ""
        });
  
        this.resetUsersForm();
        this.userList();
      }, (err: any) => {
        this.inputJson.next({
          popShow: true,
          popMsg: "Something went wrong",
          popClass: "alert alert-danger",
          popRoute: ""
        })
      });
    //}
   
  }

  resetDeptForm() {
    this.create = true;
    this.deptForm.reset();
  }

  roleList() {
    this._userservice.allroleList().subscribe((res: any) => {
      this.roleData = res["data"];
      console.log("role data>>>>>>>>>>>>>>>>" + this.roleData.value)
    })
  }

  deptList() {
    this._userservice.alldeptList().subscribe((res: any) => {
      this.deptData = res["data"];
      console.log("dept data>>>>>>>>>>>>>>>>" + this.roleData.value)
    })
  }

  desigList() {
    this._userservice.alldesigList().subscribe((res: any) => {
      this.desigData = res["data"];
      console.log("desigData data>>>>>>>>>>>>>>>>" + this.roleData.value)
    })
  }

  updateDepartment() {

  }

  onUpdateForm() {
    if (this.deptForm.invalid) {
      return;
    }
    let putData = {
      userDept: this.deptForm.value.deptName.trim(),
      deptId: this.deptPkey
    };

  }



  resetUsersForm() {
    this.userForm.reset();
  }

  userList() {
    this._userservice.alluserList().subscribe((res: any) => {
      this.loadingtxt = false;

      this.allData = res;
      console.log("222222>>>>>>>>>>>>>>>>>>>>>>>>>>" + this.allData.length)
      //this.userList();
    }), (err: any) => {
      this.loadingtxt = false;
      this.inputJson.next({
        popShow: true,
        popMsg: err,
        popClass: "alert alert-danger",
        popRoute: ""
      })
    }
  }
  EditUser(putData: any) {
    this.myModal = true;
    console.log("inside the update user>>>>>>>>>>>>>>>>>>"+this.myModal)
    this.editData = putData;
  }

  closePop = () => {
    this.myModal = false;
    console.log("inside the close>>>>>>>>>>>"+ this.myModal);
  }

  updateUser(putData: any) {
  
    this._userservice.updateUser(putData).subscribe((res: any) => {
      
      console.log("mnnnnnnnnnnnnnnnnnnnnnnnn")
     
      this.inputJson.next({
        popShow: true,
        popMsg: "User update Successfully",
        popClass: "alert alert-success",
        popRoute: ""
                
      });
      this.myModal = false;
      console.log("vbnvvvvvvvvvvvvvvvvvvvvvvvvvv")
   
    }, (err: any) => {

      this.inputJson.next({

        popShow: true,
        popMsg: "User not update Successfully",
        popClass: "alert alert-success",
        popRoute: ""
        
        
      });

    });
  }

  // updateUser(a:any){
  //   this._userservice.abc.next(11111)
  //   this._Router.navigate(["loginpage"])
  // }


  onUpload(val:any) {
    console.log(val, "jjfile###################")
    this.fileProgress = 0
    const fd = new FormData()
    fd.append("file", this.fileName) ;
   // fd.append("file_type", 'pdf');

    console.log(fd, "dcv")
   
    this._uploadDocSer.addDocs(fd).subscribe((res: any)=>{
      if(res && res['status'] == 200){
        console.log(res, "fvyjfvj")
      }
      console.log( "Succesfully docs uploaded>>>>>>>>>>>>>>>>",res["fileName"])
      this.resetflag=true;
      this.docfileName=res["fileName"]

      console.log( "docfileName docs uploaded>>>>>>>>>>>>>>>>",this.docfileName)
     
    })



  }

  handleChange(event:any) {
    console.log(event, "jjjjj>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    this.fileName = event.target.files[0];
    console.log("filename>>>>>>>>>>>>>>>>>>>>>>>>>>"+this.fileName)
    this.onUpload(eval);
  }


  onFileSelected(event:any) {
    let getFileType = event.target.files[0].type
    let fileLength = getFileType.length
    let fileIndex = getFileType.indexOf('/') + 1
    let getExt = event.target.files[0].type.substring(fileIndex, fileLength);
    console.log(fileLength, "filelength")

    if (this.parm.fileType.includes(getExt)) {
      this.selectedFile = <File>event.target.files[0];
      //document.getElementById("fileError").style.display = "none"
      document.getElementById("fileError")?.style.display 
      return true
    } else {
      this.fileUploadForm.controls.fileUpload.reset()
     // document.getElementById("fileError").style.display = "block"
      document.getElementById("fileError")?.style.display 
      this.fileError = "File format not supported"
      return false
    }
    let allowedFileSize: number = 1024 * 100 //Size in MB(1MB = 1024KB)
    let uploadedFileSize: number = parseInt((event.target.files[0].size / 1000).toFixed(0)) //Size in KB

    this.fileSelectedToUpload = uploadedFileSize;

    console.log("uploadedFileSize", uploadedFileSize);
    if (uploadedFileSize <= allowedFileSize) {
     // document.getElementById("fileError").style.display = "none"
      document.getElementById("fileError")?.style.display 
      return true
    } else {
      this.fileUploadForm.controls.fileUpload.reset()
     // document.getElementById("fileError").style.display = "block"
      document.getElementById("fileError")?.style.display 
      this.fileError = "File size should be less than 100 MB"
      return false
    }

  }
}