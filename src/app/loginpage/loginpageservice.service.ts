import { Injectable } from '@angular/core';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoginpageserviceService {
  authAPI: any;
  authAPIAuth:any;
  userrole: any;
  inputflag = new BehaviorSubject("");
  constructor( private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.authAPI=this._apiurl.authAPI
    this.authAPIAuth=this._apiurl.baseURL4
   }

   loginSubmit(fv:any){
   
    let url : string =this.authAPI+"login/authenticate"
   
    return this._http.post(url, fv);
    
  }

  getUserSubmit(fv:any){
   
    let url : string =this.authAPI+"login/validatetoken"
   
    return this._http.post(url, fv);
    
  }


  loginSubmitWithGit(){
    
    //let url : string =this.authAPI+"user/checkuser"
   // let url : string =this .authAPIAuth+"github"
    let url : string ="http://192.168.40.114:5014/githubtest"
   console.log("Auth url>>>>>>>>>>>>>>>>>",url);

   //window.location.href = 'http://192.168.40.114:5014/github';
   //window.location.href = 'http://192.168.56.11:8014/login';
   
    return this._http.get('http://192.168.40.114:5014/github');
    
    
  }

  

   
  }
