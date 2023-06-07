import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  j: any = {}//for single object call
  filterForm: FormGroup  
  PartyCode:any
  invoiceNo:any
  chart1: any

  constructor(private _Router: Router,private _filter:FilterService) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      PartyCode:new FormControl(null),
      invoiceNo:new FormControl(null),
      OrderNo:new FormControl(null),
      Status:new FormControl(null),
      year:new FormControl(null),
      week:new FormControl(null),
      grNo:new FormControl(null)
    })
  }


  filterFormsearch() {

 
    
   let fv = this.filterForm.value



   console.log("url ############ param./"+fv.PartyCode+"/"+fv.invoiceNo+"/"+fv.OrderNo+"/"+fv.Status)
   
   this._filter.filterViewList(fv).subscribe((res: any) => {
   
     if (res['status'] == "200") {
      console.log("getall-billpunch-details-filter>>>>>>>>>>",res)
    
      //this.j = res["data"];
     // localStorage.setItem("param",JSON.stringify(res.data))
     //By local storage method
     
     let jsonData:any= JSON.stringify(res.data);
     console.log(">>>>>>>>>>>>>>>bnnnnnnnnnnnnnnnn"+jsonData);
     sessionStorage.setItem("filterData",jsonData)
      this._Router.navigate(["/listpage"])
      //by parameter pass method
      
      
     } else {

     }
     
   })

 }



}
