import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class FormserviceService {
  billPunch: any;
  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunch=this._apiurl.billPunch
   }

  formpageViewList(v:any){

  
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+v["billOrderNo"]);

      
   let url : string =this.billPunch+"get-history-list-populate-by-billno-test"

    return this._http.post(url,v);
  }

  filterViewList(fv:any){
   
        
    let url : string =this._apiurl.billPunch+"getall-billpunch-details-filter"
   
    return this._http.get(url+"/"+fv.partyCode+"/"+fv.invoiceNO+"/"+fv.billOrderNo+"/"+"RECORD_RECEIVED"+"/"+fv.year+"/"+fv.week+"/"+fv.grNo);
 }

  onSubmitListForm(v:any){

    let url : string =this.billPunch+"save-details-one"
 
    return this._http.post(url,v);
 
  }
}
