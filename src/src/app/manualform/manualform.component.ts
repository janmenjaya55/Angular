import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {DatePipe} from "@angular/common"
import { ApiUrlserviceService } from '../apiurl/api-urlservice.service';
import { BehaviorSubject } from "rxjs";
import { ManualserviceService } from './manualservice.service';

@Component({
  selector: 'app-manualform',
  templateUrl: './manualform.component.html',
  styleUrls: ['./manualform.component.css']
})
export class ManualformComponent implements OnInit {

  formentry: FormGroup  
  j: any = {};//for single object call
  postData: any={};
  allData: any;
  billId:any;
  billPunch: any;
  inputJson = new BehaviorSubject({});
  
 


 

  constructor( private _router: Router, private _formpage: ManualserviceService, 
    private _Activatedroute:ActivatedRoute,private fb: FormBuilder, private _date: DatePipe) {
     
      
   
  }

  
  ngOnInit(): void {
    
  
 
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
      invoiceCost: new FormControl(""),



      articleCode: new FormControl(""),
      weekYear: new FormControl(""),
      rdcPair: new FormControl(""),
      noOfCartons: new FormControl(""),
      receiveDate: new FormControl(""),
      status: new FormControl("SUBMITTED")
       
  
  
     });
 


  }



  onSubmitListForm(){


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
  resetUsersForm() {
    this.formentry.reset();
  }


  }
  