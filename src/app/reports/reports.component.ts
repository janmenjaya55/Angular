import { Component, OnInit } from '@angular/core';
import { ReportseviceService } from './reportsevice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';

import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { ExportxlserviceService } from '../exportxl/exportxlservice.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  j: any = [];
  extension :any;
  constructor(private datePipe: DatePipe,private _Activatedroute:ActivatedRoute,private _Router: Router, private reportser: ReportseviceService, private excelService: ExportxlserviceService) { ;
  
  }

  weekArr= new Array(54)
  downloadReportsForm = new FormGroup({
    week: new FormControl(''),
    year: new FormControl(''),
  });
  currWeekValue:string = '';
  curryearValue: '';
  report_type:any
  ifBtnDisabled: boolean = true
 
  yearArray:any = []
  searchButton: boolean = false;
  

  ngOnInit() {

    let currYear = (new Date()).getFullYear();
    let startYear = 2015
    for (var i = startYear; i <= currYear; i++) {
      this.yearArray.push(i);
    }
  }

  
  submitForm() {
    this.curryearValue = this.downloadReportsForm.value.year;
    (Number(this.downloadReportsForm.value.week) < 10) ?  (this.currWeekValue = '0'+this.downloadReportsForm.value.week) : (this.currWeekValue = this.downloadReportsForm.value.week);
    if(this.curryearValue)
    this.ifBtnDisabled = false
  }
  
  resetPage(){
    this.currWeekValue = '';
    this.curryearValue = '';
    this.ifBtnDisabled = true;
  }

  
  downloadReportfile(report_type:any){
    let api :any;
    if(report_type == 1){
      api="get-bill-punch-edp-report-details/";
    }else

    if(report_type == 2){
      api="get-bill-punch-trans-report-details/";
      
    }else

    if(report_type == 3){
      api="get-bill-punch-contract-batch-report-details/";
      
    }else

    if(report_type == 4){
      api="get-bill-punch-xl-report-details-for-supply/";
     
    }
  
    if(report_type == 1){
      this.extension = 'EDP_Report.zip'
    }
    if(report_type == 2){
      this.extension = 'Trans_Report.zip'
    }
    if(report_type == 3){
      this.extension = 'Adonis_Report.zip'
    }
    if(report_type == 4){
      this.extension = 'Supply_Report.zip'
    }

    
    this.reportser.downloadReport(api,report_type,this.currWeekValue,this.curryearValue);
  
  
}

exportAsXLSX(): void {
  let jsonForExcel = this.jsonToExcelFormat()
  this.excelService.exportAsExcelFile(jsonForExcel, 'reports');
}

jsonToExcelFormat() {
  
  let jsonForExcel:any= []
  let ParentRow = {}
  let childRow = {}
  this.j.forEach((parent: any,index:any) => {
   
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
