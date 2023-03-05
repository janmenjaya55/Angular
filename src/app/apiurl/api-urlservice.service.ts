import { Injectable } from '@angular/core';
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
  constructor() { 

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
        //this.baseURL4 = this.environmentUrlthree + ':5014/'
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
}
