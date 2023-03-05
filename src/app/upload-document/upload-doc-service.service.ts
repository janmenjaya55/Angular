import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDocServiceService {
  billPunchdoc: any;
  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunchdoc=this._apiurl.billPunchdoc
   }



  addDocs(docsreq: any) {
  

    let url : string =this.billPunchdoc+"uploadFile?file="
    console.log("docs url>>>>>>>>>>>>>>>>>>"+url)
    console.log("docs details>>>>>>>>>>>>>>>>>>"+docsreq)

    return    this._http.post(url,docsreq);
 
  }

  downloadDocs(data: any) {
    
    let url : string =this.billPunchdoc+"downloadFile/"+data
    console.log("docs downlaod url>>>>>>>>>>>>>>>>>>"+url)
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
     document.body.appendChild(link);
    console.log("link>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",link)
    link.click();
    link.remove();

    return    this._http.get(url);
 
  }


 
}
