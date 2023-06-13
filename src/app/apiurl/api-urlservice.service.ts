import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
//import { environment } from 'src/environments/environment';
import { environment} from 'src/environments/environment.prod';
 


@Injectable({
  providedIn: 'root'
})
export class ApiUrlserviceService {

  environmentName = '';
  environmentUrl = '';
  baseURL:string
  baseURL1:string
  baseURL2:string
  baseURL3:string
  baseURL4:string
  baseURL5:string
  billPunch:string
  billPunchdoc:string
  billPunchmedia:string
  billPunchauth:string
  user:string
  authAPI: string
  environmentUrlone= '';
  environmentUrltwo= '';
  environmentUrlthree= '';
  apiURL: string;
  constructor(private _http: HttpClient) { 

    this.environmentName = environment.environmentName;
    this.environmentUrl = environment.apiUrl;
    this.environmentUrlone = environment.apiUrlone;
    this.environmentUrltwo = environment.apiUrltwo;
    this.environmentUrlthree = environment.apiUrlthree;

    console.log('enviornment: '+this.environmentName)
    console.log('enviornment: '+this.environmentName)
    console.log('environmentUrl: '+this.environmentUrl)
    console.log('environmentUrl: '+this.environmentUrlone)
   
      if (this.environmentName == 'dev') {
        this.baseURL = this.environmentUrl + ':8090/bataloginzull/'
        this.baseURL1 = this.environmentUrlone + ':8090/batazull/'
        this.baseURL2 = this.environmentUrltwo + ':8090/batadoczull/'
        this.baseURL3 = this.environmentUrlthree + ':8090/batamediazull/'
        this.baseURL4 = this.environmentUrlthree + ':8090/bataauthzull/'
        this.baseURL5 = this.environmentUrlthree + ':5014/'
        console.log('environmentUrl: '+this.baseURL)
        console.log('environmentUrl: '+this.baseURL1)
        //this.baseURL = this.environmentUrl + ':5010/'
        //this.baseURL1 = this.environmentUrlone + ':5011/'
       
      }else {
        this.baseURL = this.environmentUrl + ':8091/bataloginzull/'
        this.baseURL1 = this.environmentUrlone + ':8091/batazull/'
        this.baseURL2 = this.environmentUrltwo + ':8091/batadoczull/'
        this.baseURL3 = this.environmentUrlthree + ':8091/batamediazull/'
        this.baseURL4 = this.environmentUrlthree + ':8091/bataauthzull/'
        console.log("local"+'environmentUrl: '+this.baseURL)
        console.log("local"+'environmentUrl: '+this.baseURL1)
        console.log("local"+'environmentUrl: '+this.baseURL2)
        //this.baseURL = this.environmentUrl + ':5010/'
        //this.baseURL1 = this.environmentUrlone + ':5011/'
      }
      this.billPunch = this.baseURL1+"bill-punch/"
      this.billPunchdoc = this.baseURL2
      this.billPunchmedia = this.baseURL3
      this.billPunchauth= this.baseURL4
     // this.user = this.baseURL+"batabps/user/"
      this.authAPI = this.baseURL+"batabps/"
      console.log('environmentUrl: '+this.authAPI )
      console.log('environmentUrl: '+ this.billPunch)
      console.log("local"+'environmentUrl: '+this.baseURL2)
      console.log("local"+'environmentUrljjjjjjjjjjjjjjjjjjjj: '+this.baseURL3)

  }

  httpStr: string = window.location.href.substring(0, window.location.href.indexOf(':'));

  securepost(url: string, data: any) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      //_hd = _hd.set("BATA_USER_SIGNATURE", saTkn);
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", "Bearer "+saTkn);
      return this._http.post(this.httpStr + url, data, { headers: _hd });
    } else {
      return new Observable<any>();
    }

  }
  secureput(url: string, data: any) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    console.log(saTkn);
    if (saTkn) {
      let _hd = new HttpHeaders();
      _hd = _hd.set("Authorization", saTkn);
      return this._http.put(this.httpStr + url, data, { headers: _hd });
    } else {
      return new Observable<any>();
    }
  }

  secureget(url: string) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      _hd = _hd.set('Accept', 'application/json');
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", "Bearer "+saTkn);
      console.log("@@@@@@@@@@@@@@@@@@@@" + url);
      return this._http.get( this.httpStr +  url, { headers: _hd });
    } else {
      return new Observable<any>();
    }
  }

  securedelete(url: string) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      _hd = _hd.set("Authorization", saTkn);
      console.log(saTkn);
      return this._http.delete(this.httpStr + url, { headers: _hd });
    } else {
      return new Observable<any>();
    }
  }


  secureMultipart(url: string, data: any) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      _hd = _hd.set("Authorization", saTkn);
      return this._http.post(this.httpStr + url, data, { headers: _hd });
    } else {
      return new Observable<any>();
    }

  }

  get(url: string) {
    return this._http.get(this.httpStr + url);

  }

  post(url: string, data: any) {

    return this._http.post(this.httpStr + url, data);

  }

  delete(url: string) {
    return this._http.delete(this.httpStr + url)
  }


  put(url: string, data: any) {
    return this._http.put(this.httpStr + url, data)
  }

  securegetBlob(url: string) {
    let saTkn = sessionStorage.getItem("S_A_Token");
    if (saTkn) {
      let _hd = new HttpHeaders();
      _hd = _hd.set('Accept', 'application/octet-stream');
      _hd = _hd.set('Content-Type', 'application/json');
      _hd = _hd.set("Authorization", "Bearer "+saTkn);
      return this._http.get(this.httpStr + url, { headers: _hd,responseType: 'blob' });
    } else {
      return new Observable<any>();
    }
  }
}
