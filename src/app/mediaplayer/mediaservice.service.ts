import { Injectable } from '@angular/core';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaserviceService {

  billPunchmedia: any;
  constructor(  private _http: HttpClient,private _apiurl:ApiUrlserviceService) {
    this.billPunchmedia=this._apiurl.billPunchmedia
   }



  submitMedia(filename: any,fileformat:any) {
  

    let url : string =this.billPunchmedia+"videofolder"+"/"+filename
    let urlmp3 : string =this.billPunchmedia+"musicfolder"+"/"+filename
    console.log("media url>>>>>>>>>>>>>>>>>>"+url)
    console.log("filename details >>>>>>>>>>>>>>>>>>"+filename)

  
   


  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  if(fileformat=="mp4"){
    link.setAttribute('href', url);
    console.log("fillllllllllllllllllllllllllll",url+"/"+filename);
    this._http.get(url);
  }else if(fileformat=="mp3"){
    link.setAttribute('href', urlmp3);
    this._http.get(urlmp3);
  }
 

   document.body.appendChild(link);
  console.log("link>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",link)
  link.click();
  link.remove();

  
  }


  searchMedia() {
  

    let url : string =this.billPunchmedia+"get-media-files"
    
    console.log("media url>>>>>>>>>>>>>>>>>>"+url)


 
   return this._http.get(url);
  
   
   
 
  }
  addDocs(docsreq: any) {
  

    let url : string =this.billPunchmedia+"upload/remotetest?file="
    console.log("docs url>>>>>>>>>>>>>>>>>>"+url)
    console.log("docs details>>>>>>>>>>>>>>>>>>"+docsreq)

    return    this._http.post(url,docsreq);
 
  }
  
}