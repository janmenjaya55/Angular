import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import {BehaviorSubject,Observable} from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class ReportseviceService {

  billPunch: string;

  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
   }


   downloadReport(api:any,report_type:any,week:any,year:any){

    window.open(this.billPunch +api+week+'/'+year)
      return Promise.resolve(1);
    
  }


  // securegetBlob(url: string) {
  //   let saTkn = sessionStorage.getItem("S_A_Token");
  //   if (saTkn) {
  //     let _hd = new HttpHeaders();
  //     _hd = _hd.set('Accept', 'application/octet-stream');
  //     _hd = _hd.set('Content-Type', 'application/json');
  //     _hd = _hd.set("Authorization", "Bearer "+saTkn);
  //     return this._http.get(this._http + url, { headers: _hd,responseType: 'blob' });
  //   } 
  // }

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
  
}
