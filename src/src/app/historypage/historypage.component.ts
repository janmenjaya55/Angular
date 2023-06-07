import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as xlsx from 'xlsx';
import { HistorypageserviceService } from './historypageservice.service';
import { ExportxlserviceService } from '../exportxl/exportxlservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historypage',
  templateUrl: './historypage.component.html',
  styleUrls: ['./historypage.component.css']
})
export class HistorypageComponent implements OnInit {

  j: any = {}//for single object call
  datalist: any = [];
  filterForm: FormGroup  
  PartyCode:any
  invoiceNo:any
  chart1: any

  allData: any={};
 // j: any = {};
 
 ifchartLoaded: boolean = false;
 loadingSpinner: boolean = false;
 chart: any;
 chartvalue: any = [];
 chartAxis: any = [];
 chartvaluesecond: any = [];
 fyear: any;
 fyList: any;

  constructor(private datePipe: DatePipe,private _Router: Router,private _filter:HistorypageserviceService, private excelService: ExportxlserviceService) { }

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



   console.log("url ############ param./"+fv.PartyCode+"/"+fv.invoiceNo+"/"+fv.OrderNo+"/"+fv.Status+"/"+fv.week+"/"+fv.year+"/"+fv.grNo)
   
   this._filter.filterViewList(fv).subscribe((res: any) => {
   
     if (res['status'] == "200") {
      console.log("getall-billpunch-details-filter>>>>>>>>>>",res)
    
      this.datalist = res["data"];
     // localStorage.setItem("param",JSON.stringify(res.data))
     //By local storage method
     
    //  let jsonData:any= JSON.stringify(res.data);
    //  console.log(">>>>>>>>>>>>>>>bnnnnnnnnnnnnnnnn"+jsonData);
    //  sessionStorage.setItem("filterData",jsonData)
    //   this._Router.navigate(["/listpage"])
      //by parameter pass method
      
      
     } else {

     }
     
   })

 }

 formpage(data: any) {
  console.log(data.createdDate)
 this.allData= JSON.stringify(data);
 console.log(">>>>>>>>>>>>>>>bnnnnnnnnnnnnnnnn"+this.allData);
 sessionStorage.setItem("listData",this.allData)
 console.log(">>>>>>>>>>>>>>>mmm"+this.allData);
 this._Router.navigate(["/formpage"]);
}

exportAsXLSX(): void {
  let jsonForExcel = this.jsonToExcelFormat()
  this.excelService.exportAsExcelFile(jsonForExcel, 'reports');
}

jsonToExcelFormat() {
  
  let jsonForExcel:any= []
  let ParentRow = {}
  let childRow = {}
  this.datalist.forEach((parent: any,index:any) => {
   
    console.log(">>>>>>>>>>>>>>>>>>>>>>> parent.item.length",parent)
     
    if (parent.length > 1) {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>if (parent.length > 1)>>>>>>>>>>>>>>>>>>>")
      parent.forEach((child:any) => {
              childRow = {
          'Order No': child.billOrderNo,
           'Party Code': child.partyCode,
          'Invoice No': child.invoiceNO,
          'Created On': this.datePipe.transform( child.billOrderDate,'dd-MM-yyyy'),
           'Status': child.status
                     
        }
        
        jsonForExcel.push(childRow)
      })
    }else{
      console.log(">>>>>>>>>>>>>>>>>>>>>>> parent.item.length valur",parent.billOrderNo)
      childRow = {
        'Order No': parent.billOrderNo,
         'Party Code': parent.partyCode,
        'Invoice No': parent.invoiceNO,
        'Created On': this.datePipe.transform( parent.billOrderDate,'dd-MM-yyyy'),
         'Status': parent.status
                   
      }
      jsonForExcel.push(childRow)
    }
  })
  return jsonForExcel;
}

exportToExcel(data:any) {
  /* table id is passed over here */
  let element = document.getElementById('data-records');
  // let element2 = document.getElementById('excel-table1');
  const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);
  /* generate workbook and add the worksheet */
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  /* save to file */
  xlsx.writeFile(wb, 'report.xlsx');
}



}
