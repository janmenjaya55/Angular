import { Component, OnInit } from '@angular/core';
import { LoginpageserviceService } from '../loginpageservice.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoutOut = new BehaviorSubject({})
  constructor( private _LoginS: LoginpageserviceService,private _router: Router) { }

  navAdmin: boolean = false

  navFinanceUser: boolean = false
  navFinanceApprover: boolean = false
  vspladmin: boolean = false
  username:any;


  ngOnInit() {
   // this.loginResponse();
    this.checkLogin();

  }

  // redirect(url) {
  //   this._router.navigate([url])
  // }

  checkLogin() {

    switch (sessionStorage.getItem("userrole")) {
      case "ChairPerson":
        this.navAdmin = true

        this.navFinanceUser = false
        this.navFinanceApprover = false
        this.vspladmin = false
        break;
      case "Finance Approver":
        this.navAdmin = false
        this.navFinanceUser = false
        this.navFinanceApprover = true
        this.vspladmin = false
        break;
      case "Finance User":
        this.navAdmin = true
        this.navFinanceUser = false
        this.vspladmin = false
        this.navFinanceApprover = false
        break;

        case "VSPLAdmin":
          this.navAdmin = false
          this.navFinanceUser = false
          this.vspladmin = true
          this.navFinanceApprover = false
          break;

    }

   let token = sessionStorage.getItem("S_A_Token")
    console.log("check in service>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+sessionStorage.getItem("userrole"))

   this.GetUserName();
  }

  GetUserName(){
    let tokens = sessionStorage.getItem("S_A_Token")
   let json = {"token":tokens}
    this._LoginS.getUserSubmit(json).subscribe((res:any) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>..usernamejjjjjjjjjjjjjjjjjjjjjjjjjjjkkkkkkkkkk"+res["username"])
      this.username=res["username"];
    })
  }

  loginResponse(){
    let tokens = sessionStorage.getItem("S_A_Token")
    let json = {"token":tokens}
    this._LoginS.loginSubmit(json).subscribe((res: any) =>{
      console.log("login response")
      console.log(res)
      console.log(res["userrole"])
     // if(Object.keys(res).length!==0 && this.checkHeader==true){
     //   this.checkHeader = false
        if(res["userrole"]=="ADMIN")
        {
          this.navAdmin = true;
        }
     // }
    })
  }

  logout() {
    sessionStorage.clear()
    console.log("removeitem")
    sessionStorage.removeItem("S_A_Token");
    sessionStorage.removeItem("userrole");
    this.navAdmin = false
    this._router.navigate(["/forgotpasswordpage"])
    this.logoutOut.next({
      "auth": false,
      "checkAuth": true
    })
   
  }

fetchFlag(paramet:any){
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>"+paramet);
  // change_pass
   this.fetchFlag=paramet;
  // sessionStorage.setItem("fetchFlag", JSON.stringify(this.fetchFlag))
   this._LoginS.inputflag.next(paramet)
  this._router.navigate(["/forgotpasswordpage"])
  console.log("chnage password>>>>>>>>>>>>>>>>>>>>>"+this.fetchFlag);
  
}
  

}
