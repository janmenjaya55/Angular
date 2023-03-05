import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportseviceService } from '../reports/reportsevice.service';
import { MediaserviceService } from './mediaservice.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mediaplayer',
  templateUrl: './mediaplayer.component.html',
  styleUrls: ['./mediaplayer.component.css']
})
export class MediaplayerComponent implements OnInit {

  constructor(private datePipe: DatePipe,private _Activatedroute:ActivatedRoute,private _Router: Router, private reportser: ReportseviceService, private mediaService: MediaserviceService) { }


  inputform = new FormGroup({
    FileName: new FormControl(''),
    FileFormat: new FormControl(''),
  });
  fileProgress: any
  resetflag: boolean=false;
  docfileName:string='';
  uploadfileName = '';
  FileFormat:string ='';
  FileName:string = '';
  curryearValue: '';
  report_type:any
  ifBtnDisabled: boolean = true
 
  filenameArray:any = [];
  formatlistArray:any = ['mp3','mp4']
  searchButton: boolean = false;
  

  ngOnInit() {
this.searchMediaFile();

    
  }

  submitMedia(){
    this.mediaService.submitMedia(this.FileName,this.FileFormat)
    
  }

  searchMediaFile(){
    this.mediaService.searchMedia().subscribe((res: any) =>{
      this.filenameArray = [];
      res["data"].forEach((x:any) => {
      
          this.filenameArray.push(x);
      });

this.FileFormat=this.inputform.value.FileFormat;
this.FileName=this.inputform.value.FileName;
    
      console.log("returndata>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",res["data"])
      console.log( this.filenameArray)
      console.log("FileFormat>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.FileFormat);
      console.log( "Filename>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this.FileName);
      
    });
  
  }
 resetPage(){
    this.FileName = '';
    this.FileFormat = '';
    this.ifBtnDisabled = true;
  }

  handleChange(event:any) {
    console.log(event, "jjjjj>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    this.uploadfileName = event.target.files[0];
    console.log("filename>>>>>>>>>>>>>>>>>>>>>>>>>>"+this.uploadfileName)
    this.onUpload(eval);
  }

  onUpload(val:any) {
    console.log(val, "jjfile###################")
    this.fileProgress = 0
    const fd = new FormData()
    fd.append("file", this.uploadfileName) ;
   // fd.append("file_type", 'pdf');

    console.log(fd, "dcv")
   
    this.mediaService.addDocs(fd).subscribe((res: any)=>{
      if(res && res['status'] == 200){
        console.log(res, "fvyjfvj")
      }
      console.log( "Succesfully docs uploaded>>>>>>>>>>>>>>>>",res["fileName"])
      this.resetflag=true;
      this.docfileName=res["fileName"]

      console.log( "docfileName docs uploaded>>>>>>>>>>>>>>>>",this.docfileName)
     
    })



  }

}
