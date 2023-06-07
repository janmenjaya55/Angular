import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormserviceService } from './formservice.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {DatePipe} from "@angular/common"
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import { BehaviorSubject } from "rxjs";
@Component({
  selector: 'app-formpage',
  templateUrl: './formpage.component.html',
  styleUrls: ['./formpage.component.css']
})
export class FormpageComponent implements OnInit {
  formentry: FormGroup  
  
  j: any = {};//for single object call
  postData: any={};
  allData: any;
  billId:any;
  billPunch: any;
  inputJson = new BehaviorSubject({});
  
 


 

  constructor( private _router: Router, private _formpage: FormserviceService, 
    private _Activatedroute:ActivatedRoute,private fb: FormBuilder, private _date: DatePipe) {
     
      
   
  }

  
  ngOnInit(): void {
    
    this.allData =   JSON.parse(sessionStorage.getItem("listData")!);
 
    console.log(this.allData);
  
     this.formentry = new FormGroup({
      partyCode: new FormControl(""),
      partyName:new FormControl(""),
      partyCodeSearch: new FormControl(""),
      invoiceNO: new FormControl(""),
      grNo: new FormControl(""),
      cnNo: new FormControl(""),
      receiveLoc: new FormControl(""),
      grDate: new FormControl(""),
      cnDate: new FormControl(""),
      recptInvDate: new FormControl(""),
      igst: new FormControl(""),
      cgst: new FormControl(""),
      sgst: new FormControl(""),
      igstamt: new FormControl(""),
      cgstamt: new FormControl(""),
      sgstamt: new FormControl(""),
      freight: new FormControl(""),
      totalCost: new FormControl(""),
      discountAmtVal: new FormControl(""),
      discountAmt: new FormControl(""),
      tcsApplicable: new FormControl(""),
      creditNote: new FormControl(""),
      tcsValue: new FormControl(""),
      tcsPercent: new FormControl(""),
      stateCode: new FormControl(""),
      stateName: new FormControl(""),
      shopNo: new FormControl(""),
      shopName: new FormControl(""),
      billOrderNo: new FormControl(""),
      billOrderDate: new FormControl(""),
      pair: new FormControl(""),
      purchaseCost: new FormControl(""),
      invoiceCost: new FormControl("")
  
      
  
  
     });
 
 this.getData()

  }

  getData(){
    this._formpage.formpageViewList(this.allData).subscribe((res: any) => {
      if (res['status'] == "200") {
        console.log(res);
        this.j =res["data"];
        this.j.billOrderDate = this._date.transform(this.j.billOrderDate, "yyyy-MM-dd")
        this.j.recptInvDate = this._date.transform(this.j.recptInvDate, "yyyy-MM-dd")
        this.j.grDate = this._date.transform(this.j.grDate, "yyyy-MM-dd")
        this.j.grnDate = this._date.transform(this.j.grnDate, "yyyy-MM-dd")
        this.j.cnDate = this._date.transform(this.j.cnDate, "yyyy-MM-dd")

      }
     
   })
  }


  onSubmitListForm(){

   
this._formpage.filterViewList(this.formentry.value).subscribe((res: any)=>{
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>formpage ##########insertdata"+this.formentry.value);
  if (res['status'] == "200") {
    this.j = res["data"];
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>formpage ##########fetching");
   // this.resetUsersForm();

    this.inputJson.next({
      popShow: true,
      popMsg: "User update Successfully.",
      popClass: "alert alert-success",
      popRoute: ""
              
    });
  } else{
    this._formpage.onSubmitListForm(this.formentry.value).subscribe((res: any) => {
   
      if (res['status'] == "200") {
        this.j = res["data"];
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>formpage ##########submit");
        this.resetUsersForm();
      } 

      this.inputJson.next({
        popShow: true,
        popMsg: "User created Successfully.",
        popClass: "alert alert-success",
        popRoute: ""
                
      });
      console.log(res)
    })
  }
 
  console.log(res)

});
    

      
  }
  resetUsersForm() {
    this.formentry.reset();
  }


  }
  


