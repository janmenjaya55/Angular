import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportxlserviceService } from '../exportxl/exportxlservice.service';
import * as xlsx from 'xlsx';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-exportxl',
  templateUrl: './exportxl.component.html',
  styleUrls: ['./exportxl.component.css']
})
export class ExportxlComponent implements OnInit {
  highcharts = Highcharts;
  j: any = [];
  allData: any = {};
  financialYearListing: any=[];

  // j: any = {};
  financialYear: FormGroup;

  ifchartLoaded: boolean = false;
  loadingSpinner: boolean = false;
  chart: any;
  chartvalue: any = [];
  chartAxis: any = [];
  chartvaluesecond: any = [];
  fyear: any;
  fyList: any;

  constructor(private datePipe: DatePipe, private _Activatedroute: ActivatedRoute, private _Router: Router, private excelService: ExportxlserviceService) {
    ;

  }

  ngOnInit(): void {

    let currentYear : any
  let currentMonth : any
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth()+1;

  if(currentMonth == 1 || currentMonth == 2 || currentMonth == 3){
    currentYear = (currentYear -1);
  }
  console.log(currentYear,currentMonth);
    let ir : any = 0
    let short_ir : any = 0
  
    let inCr : any
    this.financialYearListing.push({"year":"null","name":"All FY"});
    for(ir = currentYear; ir>2016; ir--){
      inCr = (parseInt(ir)+1);
      short_ir = inCr.toString().substr(2,4);
      
      //this.financialYearListing.push({"year":ir+"-"+inCr,"name":"FY "+ir+"-"+inCr});
      this.financialYearListing.push({"year":ir+"-"+short_ir,"name":"FY "+ir+"-"+inCr});
      //this.financialYearListing.push({"year":ir,"name":"FY "+ir+"-"+inCr});
      console.log("financialYearListing>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this.financialYearListing)
    }
    
    this.financialYear = new FormGroup({
            
      financialYear: new FormControl("")

    });
    this.fyear = this.getCurrentFY();
    this.fyList = this.getCurrentFYFormat2()
    this.reloadChart(this.fyear)
  }


  
  reloadChart(year:any) {
this.fyear=year;
    this.getGraphData(this.fyear)
  }

  getGraphData(fyear:any) {

    this.chartAxis = []
    this.excelService.getGraphData(this.fyear).subscribe((res: any) => {
      console.log(' Graph data')
      if (res['status'] == "200") {
        this.j = res["data"];
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>.true condition", this.j)

        this.drawGraph(this.j)
      }else{
        this.j=[];
        this.drawGraph(this.j)
      }

    })
  }

  drawGraph(data1: any) {
    //start for line chart logic >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const data: any[] = [];
    const databar: any[] = [];
    const datapie: any[] = [];
    const datagauge: any[] = [];
    data1.forEach((element: any) => {

      var x = element.data;
      var r: number = +x;
      console.log(r)//bcz in charts string are not allowed
      var p = element.count;
      var q: number = +p;
      console.log(q)//bcz in charts string are not allowed
      data.push([r, q]);
      databar.push({ name: r, y: q });
      datapie.push({ name: r, y: q });
      datagauge.push({ name: r, y: q });
    });


    const chartline = Highcharts.chart('chart-line', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Line Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>PartyCode: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: [{
        name: 'Count',
        data,
      }],
    } as any);
    // setInterval(() => {
    //   date.setDate(date.getDate() + 1);
    //   chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
    // }, 1500);//for dynamic value change

    //Start fro bar chats logic>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    const chartbar = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Column Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>PartyCode: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Count',
        data: databar,
      }],
    } as any);

    const chartpie = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Pie Chart',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">PartyCode: {point.key}</span><br>`,
        pointFormat: '<span>Count: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data: datapie,
      }],
    } as any);



  }



  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getCurrentFYFormat2() {
    let fiscalyear = "";
    let today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear().toString().substr(2, 4)
    } else {
      fiscalyear = today.getFullYear() + "-" + ((today.getFullYear() + 1).toString().substr(2, 4))
    }
    return fiscalyear
  }
  getCurrentFY() {
    let fiscalyear = "";
    let today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
    } else {
      fiscalyear = today.getFullYear() + "-" + ((today.getFullYear() + 1).toString().substr(2, 4))
    }
    return fiscalyear
  }



}

