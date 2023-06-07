import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class ListpageService {

 

  billPunch: any;
  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
   }


}
