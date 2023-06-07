import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  jjData: any = [];//for list object 
  j: any = {}//for single object call
  //<div class="row" *ngFor="let j of jjData"> in html

  constructor( private _invpage: InvoiceService ) { }

  ngOnInit(): void {
    
    this.onSubmitSearchForm();
  }


  onSubmitSearchForm() {
 
    this._invpage.onSubmitSearchForm().subscribe((res: any) => {
   
      if (res['status'] == "200") {
       // this.jjData = res["data"];
        //for list url
        this.j = res["data"];
        this.j["bilId"] = null;
        this.j["billOrderNo"]="BILL09NB";
        this.j["invoiceNO"]="GD536210000274";
        this.j["partyCode"]="90536";
        this.j["partyName"]="footwareNew";
        this.saveData(this.j)
      } else {

      }
      console.log(res)
    })

  }



  saveData(j:any) {
  
    this._invpage.saveData(this.j).subscribe((res: any) => {
      if (res['status'] == "200") {
        
        this.j = res["data"];
      } 
      console.log(res)
    })

  }

}
