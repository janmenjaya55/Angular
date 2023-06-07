import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import {BehaviorSubject,Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class MasterdataserviceService {
  billPunch: any;
  authAPI: any;
 
  abc = new BehaviorSubject(0)
  constructor( private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
    this.authAPI=this._apiurl.authAPI
   }
  addUser(data: any) {
    return this._http.post(this._apiurl.user + "adduser", data);
  }
  updateUser(data: any) {
    return this._http.post(this._apiurl.user + "updateuser", data);
  }
  alluserList() {
    return this._http.get(this._apiurl.user + "allusers")
  }
  //Roles Services
  addRole(data: any) {
    return this._http.post(this._apiurl.billPunch + "role/save", data);
  }
  updateRole(data: any) {
    return this._http.put(this._apiurl.billPunch + "role/modify", data);
  }
  allroleList() {
    return  this._http.get(this._apiurl.billPunch + "role/getall")
  }
  
  //Department Services
  addDept(data: any) {
    return this._http.post(this._apiurl.billPunch + "depertment/save", data);
  }
  updateDept(data: any) {
    return this._http.put(this._apiurl.billPunch + "depertment/modify", data);
  }
  alldeptList() {
    return this._http.get(this._apiurl.billPunch + "depertment/getall")
  }

  //Designation Services
  addDesig(data: any) {
    return this._http.post(this._apiurl.billPunch + "designation/save", data);
  }
  updateDesig(data: any) {
    return this._http.put(this._apiurl.billPunch + "designation/modify", data);
  }
  alldesigList() {
    return  this._http.get(this._apiurl.billPunch + "designation/getall")
  }

}