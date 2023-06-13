import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { BehaviorSubject } from "rxjs";
import { ForgotPasswordServiceService } from '../loginpage/forgot-password/forgot-password-service.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {



  otpForm: FormGroup  ;
  
  username:any;
  userotp:any;
  b: any ;
  inputJson = new BehaviorSubject({});
  change:boolean = false;
  myModal: boolean = false;
  loadingSpinner: boolean = false;
  
   
  constructor( private _Router: Router,private _loginservice:ForgotPasswordServiceService) {
 


 }


 ngOnInit(): void {
 
console.log("hjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"+this.change)
   this.otpForm = new FormGroup({
     username:new FormControl(null),
     userotp:new FormControl(null)
   
   });
   
  

 
 }




 getotp(){
   
  console.log("getotp############"+this.change)

  let fv = this.otpForm.value
  
  
 let paramone = {"username":sessionStorage.getItem("username"),"userOtp":fv.userotp}
 console.log("returndataparamone>##################>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+paramone)
this._loginservice.forgotPassword(paramone).subscribe((res: any) =>{

 console.log(res)

 if(res["status"] == "200"){
this.b=res["data"]
console.log(this.b)

this.inputJson.next({

  popShow: true,
  popMsg: `Your password is: ${this.b}` ,
  popClass: "alert alert-success",
  popRoute: ""
  
  
});

this.otpForm.reset()
}
 

})

}
 


closePop = () => {
  this.myModal = false;
  this._Router.navigate(["/loginpage"])
}

GetUserName(){
  let tokens = sessionStorage.getItem("S_A_Token")
 let json = {"token":tokens}
  this._loginservice.getUserSubmit(json).subscribe((res:any) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>..usernamejjjjjjjjjjjjjjjjjjjjjjjjjjjkkkkkkkkkk"+res["username"])
    this.username=res["username"];
  })
}
}


