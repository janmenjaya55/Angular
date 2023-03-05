import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginpageserviceService } from '../loginpageservice.service';
import { Router } from '@angular/router';
import { ForgotPasswordServiceService } from './forgot-password-service.service';
import { BehaviorSubject } from "rxjs";
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup  ;
  passForm: FormGroup ;
  username:any;
  b: any ;
  inputJson = new BehaviorSubject({});
  change:boolean = false;
  
   
  constructor(private _loginServ: LoginpageserviceService, private _Router: Router,private _loginservice:ForgotPasswordServiceService) {
 
//   let param=sessionStorage.getItem("fetchFlag");
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>dchange param"+param);
//   sessionStorage.setItem("fetchFlag", "NO")
  
//   if(param=="YES"){
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>dchange paraminside"+param);
// this.change=true;
//   }else{
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>dchange paraminsideelse"+param);
//     this.change=false;
//   }
//   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>dchange flag"+this.change);

  }


 ngOnInit(): void {
 
console.log("hjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"+this.change)
   this.resetForm = new FormGroup({
     username:new FormControl(null)
   
   });
   
   this.passForm = new FormGroup({
    newPassword:new FormControl(null),
    password:new FormControl(null)
  });
 
  this._loginServ.inputflag.subscribe((res:any)=>{
    
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>dchange flag"+res);
    if(res=='YES'){
      this.change=true;
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>this.change>>"+this.change);
    }
    
    

  })
  this.GetUserName();
 }




 resetPassword(){
   
  console.log("nbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"+this.change)

  let fv = this.resetForm.value
 let param = {"username":fv.username}
console.log("Login sucdesfully.#########>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
console.log(param)
this._loginservice.forgotPassword(param).subscribe((res: any) =>{
 console.log("returndata>##################>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
 console.log(res)

 if(res["status"] == "200"){
this.b=res["data"]
console.log(this.b)

 this._Router.navigate(["/forgotpasswordpage"])

}
 

})

}
 

changePassword(){

 // this.change=true
  let fv = this.passForm.value
 let param = {"password":fv.password,"username":this.username}

 console.log("change password data."+ fv.password)
 if (fv.newPassword== fv.password) {
  
  console.log("Login sucdesfully.")
console.log(param)

this._loginservice.changePassword(param).subscribe((res: any) =>{
 console.log("changePasswordcvvvvvvvvvvvv>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
 console.log(res)

 if(res == true){
this.b='Password change successfully.';
console.log("change successfully>>>>>>>>>>>>>>>>>>>>>>>>>>"+this.b)

 this._Router.navigate(["/loginpage"])


}else{

  this.inputJson.next({
    popShow: true,
    popMsg: "Password and NewPassword not matched.",
    popClass: "alert alert-success",
    popRoute: ""
  });

}

 

})

}
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
