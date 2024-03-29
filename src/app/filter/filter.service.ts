import { Injectable } from '@angular/core';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  billPunch: any;
 
  constructor( private _http: HttpClient,private _apiurl:ApiUrlserviceService) { 
    this.billPunch=this._apiurl.billPunch

  }


  filterViewList(fv:any){

        
   let url : string =this._apiurl.billPunch+"getall-billpunch-details-filter"

   //return this._http.get(url+"/"+fv.PartyCode+"/"+fv.invoiceNo+"/"+fv.OrderNo+"/"+fv.Status+"/"+fv.year+"/"+fv.week+"/"+fv.grNo);
   return this._apiurl.secureget(url+"/"+fv.PartyCode+"/"+fv.invoiceNo+"/"+fv.OrderNo+"/"+fv.Status+"/"+fv.year+"/"+fv.week+"/"+fv.grNo);
}


}