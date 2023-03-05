import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ExportxlserviceService } from '../exportxl/exportxlservice.service';
import * as xlsx from 'xlsx';
import { DatePipe } from '@angular/common';
import { ListpageService } from './listpage.service';

import { HighchartsChartComponent } from 'highcharts-angular';  
import { Chart } from 'highcharts';
@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.css']
})
export class ListpageComponent implements OnInit {

 
  j: any = [];
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

  constructor(private datePipe: DatePipe,private _Activatedroute:ActivatedRoute,private _Router: Router, private excelService: ExportxlserviceService) { ;
  
  }
  formpage(data: any) {
    console.log(data.createdDate)
   this.allData= JSON.stringify(data);
   console.log(">>>>>>>>>>>>>>>bnnnnnnnnnnnnnnnn"+this.allData);
   sessionStorage.setItem("listData",this.allData)
   console.log(">>>>>>>>>>>>>>>mmm"+this.allData);
   this._Router.navigate(["/formpage"]);
  }

  ngOnInit(): void {
   // this.j=localStorage.getItem("param");
    //this.j=JSON.parse(this.j);
    this.j=(JSON.parse(sessionStorage.getItem("filterData")!))
    console.log("MY PARAM IS ::::::::=>>>>", this.j);
    console.log("ListpageComponent>>>>>>>>>>>>>>>>>>>>>>",this.j);
      //this.reloadChart();

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





