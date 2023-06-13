import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  billPunch: string;

  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
   }


   onSubmitSearchForm() {
 
    //let url : string =this.billPunch+"getall-billpunch-details"
    let url : string =this.billPunch+"getall-billpunch-details-one"



    console.log("fetch  sucdesfully.")

    return this._http.get(url);

  }



  saveData(v:any) {
   
    let url : string =this.billPunch+"save-details-one"

   return    this._apiurl.securepost(url,v);

  }
}
