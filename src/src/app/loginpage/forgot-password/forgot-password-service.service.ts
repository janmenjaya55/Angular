import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlserviceService } from 'src/app/apiurl/api-urlservice.service';
import {BehaviorSubject,Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordServiceService {
  authAPI: string;

  constructor( private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.authAPI=this._apiurl.authAPI
   }
   httpStr: string = window.location.href.substring(0, window.location.href.indexOf(':'));
   forgotPassword(fv:any){
    console.log("forgotPassword service>>>>>>>>>>>>>>>>>>>>>.",fv)
    let url : string =this.authAPI+"user/forgotpassword"
   
    
 console.log("Login data>>>>>>>>>>>>>>>>>>>>>.",fv)
 
  return this._http.post(url, fv);

  
   }

   getotp(fv:any){
    console.log("getotpvalidation service>>>>>>>>>>>>>>>>>>>>>.",fv)
    let url : string =this.authAPI+"user/getotpvalidation"
   
    
 console.log("Login data>>>>>>>>>>>>>>>>>>>>>.",fv)
 
  return this._http.post(url, fv);

  
   }

   

  getUserSubmit(fv:any){
   
    let url : string =this.authAPI+"login/validatetoken"
   
    return this._http.post(url, fv);
    
  }
   changePassword(fv:any){
   
    let url : string =this.authAPI+"user/changepwd"
    console.log("forgotPassword>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",fv)
// console.log("Login sucdesfully.")
 console.log(fv)
  return this.securepost(url, fv);
   }


 

 
   securepost(url: string, data: any) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    
    console.log("session token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",saTkn)

    if (saTkn) {
      
      let _hd = new HttpHeaders();
      _hd = _hd.set('Accept', 'application/json');
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", "Bearer "+saTkn);
     
      console.log("session token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>saTkn","Bearer eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQ2hhaXJQZXJzb24iLCJzdWIiOiJqYW5tZW5qYXlhNTU1IiwiRnVsbE5hbWUiOiJqYW5tZW5qYXlhIGJlaGVyYSIsImV4cCI6MTY3MDQxMTgwMiwiaWF0IjoxNjcwMzkzODAyfQ.JdmeSAopfvVE4EbnBYDax_utoiTmapy6HJrwYtvp-SdfKhZq1RpIAStSyJY3JCa_JPSqyoBruZSyFsUGRWqoGA")
      console.log("session token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>_hd_hd_hd",_hd)

      return this._http.post( url, data, { headers: _hd });
    } else {
      return new Observable<any>();
    }

  }

  }