import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() message:Observable<any>;
  popShow: any;
  popMsg: any;
  popClass: any;
  popRoute: any;
  popHeader: string;

  
  constructor(private _router:Router) { }

  ngOnInit() {
    //alert("validation message>>>>>>>>>>>>>>>>>>>>");
    this.message.subscribe((res:any) => {
      this.popShow = res.popShow
      this.popMsg = res.popMsg
      this.popClass = res.popClass
      this.popRoute = res.popRoute
      console.log("ngOnInit() {>>>>>>>>>>>>>>>>>>>>>>>"+res.popShow)
      console.log("ngOnInit() {>>>>>>>>>>>>>>>>>>>>>>>"+res.popMsg)
      console.log("ngOnInit() {>>>>>>>>popRoute>>>>>>>>>>>>>>>"+res.popRoute)
   
    })
  }
  closePop = () => {
    this.popShow= false;
    console.log("inside the close>>>>>>>>>>>validate"+ this.popShow);
  }
  // popClose(){
  //   this.popShow = false
  //   if(this.popRoute == ""){
  //     return false
  //   }
  //   else{
  //     this._router.navigate([this.popRoute])
  //   }
  // }
}
