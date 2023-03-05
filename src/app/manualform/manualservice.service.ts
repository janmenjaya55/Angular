import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class ManualserviceService {

  billPunch: any;
  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
   }

  onSubmitListForm(v:any){

    let url : string =this.billPunch+"save-details-manual"
 
    return this._http.post(url,v);
 
  }
}


