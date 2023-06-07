import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import {BehaviorSubject,Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  billPunch: any;
  authAPI: any;
 
  abc = new BehaviorSubject(0)
  constructor( private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
    this.authAPI=this._apiurl.authAPI
   }

  

   allroleList() {
    return this._http.get(this._apiurl.billPunch + "role/getall")
  
  }


  alldeptList() {
    return this._http.get(this._apiurl.billPunch + "depertment/getall")
  
  }


  alldesigList() {
    return this._http.get(this._apiurl.billPunch + "designation/getall")
  
  }

  
  addUser(data: any) {
    console.log(this._apiurl.authAPI + "user/adduser", data)
    return this._http.post(this._apiurl.authAPI + "user/adduser", data);
  }
  updateUser(data: any) {
    console.log(">>>>>>>>>>>>>update")
    return this.securepost(this._apiurl.authAPI + "user/updateuser", data);
  }
  alluserList() {
    console.log(this._apiurl.authAPI + "user/allusers")
   return this.secureget(this._apiurl.authAPI + "user/allusers")
 
 }
  httpStr: string = window.location.href.substring(0, window.location.href.indexOf(':'));
  secureget(url: string) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      _hd = _hd.set('Accept', 'application/json');
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", "Bearer "+saTkn);
      return this._http.get( url, { headers: _hd });
    } else {
      return new Observable<any>();
    }
  }
  
  securepost(url: string, data: any) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      //_hd = _hd.set("BATA_USER_SIGNATURE", saTkn);
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", "Bearer "+saTkn);
      return this._http.post( url, data, { headers: _hd });
    } else {
      return new Observable<any>();
    }

  }
}


   