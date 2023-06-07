import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FilterComponent } from './filter/filter.component';
import { ListpageComponent } from './listpage/listpage.component';
import { FormpageComponent } from './formpage/formpage.component';
import {DatePipe} from "@angular/common";
import { ApiurlComponent } from './apiurl/apiurl.component';
import { SelectorComponent } from './selector/selector.component';
import { HeaderComponent } from './loginpage/header/header.component';
import { FooterComponent } from './loginpage/footer/footer.component';
import { ForgotPasswordComponent } from './loginpage/forgot-password/forgot-password.component';
import { UserComponent } from './user/user.component';
import{ValidationMessageComponent} from './validation-message/validation-message.component';
import { ReportsComponent } from './reports/reports.component';
import { ApprovalpageComponent } from './approvalpage/approvalpage.component';
import { HistorypageComponent } from './historypage/historypage.component';
import { ExportxlComponent } from './exportxl/exportxl.component';
import { MapComponent } from './map/map.component';
import { OrganizatioComponent } from './organizatio/organizatio.component';
import { DesignationComponent } from './masterdata/designation/designation.component';
import { DepartmentComponent } from './masterdata/department/department.component';
import { RoleComponent } from './masterdata/role/role.component';
import { ManualformComponent } from './manualform/manualform.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { MediaplayerComponent } from './mediaplayer/mediaplayer.component';
import { AuthenticationComponent } from './authentication/authentication.component';

//import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
  
    AppComponent,
    LoginpageComponent,
    InvoiceComponent,
    FilterComponent,
    ListpageComponent,
    FormpageComponent,
    ApiurlComponent,
    SelectorComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    UserComponent,
    ValidationMessageComponent,
    ReportsComponent,
    ApprovalpageComponent,
    HistorypageComponent,
    ExportxlComponent,
    MapComponent,
    OrganizatioComponent,
    DepartmentComponent,
    DesignationComponent,
    RoleComponent,
    ManualformComponent,
    UploadDocumentComponent,
    MediaplayerComponent,
    AuthenticationComponent


  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    // ,
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    // })
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
