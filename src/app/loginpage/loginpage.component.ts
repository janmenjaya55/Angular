import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import {UserserviceService} from "../user/userservice.service"
import { LoginpageserviceService } from './loginpageservice.service';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  loginForm: FormGroup  
  username:any
  password:any
  errorMsgText: any;
  errorMsg: boolean;
  optionHide : any= false
 
  
  
  
  constructor(private _http: HttpClient,private _user: UserserviceService, private _Router: Router,private _loginservice:LoginpageserviceService) {
    
   
   }
 

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username:new FormControl(null),
      password:new FormControl(null)
    })
 this._user.abc.subscribe((res:any)=>{
   console.log(res)
 })
  }
  getPassword(paramt:any){
    this._loginservice.inputflag.next(paramt)
    this._Router.navigate(["/forgotpasswordpage"])
  }
 loginSubmit(){
  this.optionHide = true;
   
   let fv = this.loginForm.value
  let param = {"username":fv.username,"password":fv.password}
console.log("Login sucdesfully#########################.")
console.log(param)
this._loginservice.loginSubmit(param).subscribe((res: any) =>{
  sessionStorage.setItem("S_A_Token",res["token"])
  
  sessionStorage.setItem("userrole",res["userrole"])
  console.log("returndata>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  console.log(res)
  
  if(res["userrole"] == "ChairPerson"){
    this.optionHide = false;
  this._Router.navigate(["/filter"])
 console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }else if(res["userrole"] == "Finance User"){
    this.optionHide = false;
       this._Router.navigate(["/forgotpasswordpage"])
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
   }else if(res["userrole"] == "Admin User"){
    this.optionHide = false;
 // this._Router.navigate(["/invoice"])
 this._Router.navigate(["/filter"])
 console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }
  this.errorMsg=false

},(err:any)=>{
  this.optionHide = false;
  this.errorMsg=true
  this.errorMsgText="Username and Password is Invalid"
})

}



loginSubmitWithGit(){
  //this.optionHide = true;
  console.log("returndata by git hubWWW>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

this._loginservice.loginSubmitWithGit().subscribe((res: any) =>{
 
 console.log("returndata by git hub>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res)

 //this._http.get('http://localhost:5014/login', { observe: 'response' }).subscribe(() => res.headers.get('location'));
 if(res["userrole"] == "ChairPerson" || res["userrole"] == "FIN"){
  this.optionHide = false;
 this._Router.navigate(["/filter"])
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
 }else if(res["userrole"] == "Finance User"){
  this.optionHide = false;
      this._Router.navigate(["/forgotpasswordpage"])
   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }else if(res["userrole"] == "Admin User"){
    this.optionHide = false;
// this._Router.navigate(["/invoice"])
this._Router.navigate(["/filter"])
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
 }
 this.errorMsg=false

},(err:any)=>{
 this.errorMsg=true
 this.errorMsgText="Username and Password is Invalid"
})

}






}
