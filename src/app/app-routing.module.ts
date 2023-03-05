import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FilterComponent } from './filter/filter.component';
import { ListpageComponent } from './listpage/listpage.component';
import { FormpageComponent } from './formpage/formpage.component';
import { ForgotPasswordComponent } from './loginpage/forgot-password/forgot-password.component';
import { UserComponent } from './user/user.component';
import { ReportsComponent } from './reports/reports.component';
import { ApprovalpageComponent } from './approvalpage/approvalpage.component';
import { HistorypageComponent } from './historypage/historypage.component';
import { ExportxlComponent } from './exportxl/exportxl.component';
import { MapComponent } from './map/map.component';
import { OrganizatioComponent } from './organizatio/organizatio.component';
import { RoleComponent } from './masterdata/role/role.component';
import { DesignationComponent } from './masterdata/designation/designation.component';
import { DepartmentComponent } from './masterdata/department/department.component';
import { ManualformComponent } from './manualform/manualform.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { MediaplayerComponent } from './mediaplayer/mediaplayer.component';





const routes: Routes = [
  {
    path:'',
    component:LoginpageComponent
  },
   {path:'invoice' , component:InvoiceComponent}
   ,
   {path:'filter' , component:FilterComponent}
   ,
   {path:'listpage' , component:ListpageComponent}
   ,
   {path:'formpage' , component:FormpageComponent},
   {path:'loginpage' , component:LoginpageComponent},
   {path:'forgotpasswordpage' , component:ForgotPasswordComponent},
   {path: 'user', component: UserComponent},
   {path: 'reports', component: ReportsComponent},
   {path: 'approvalpage', component: ApprovalpageComponent},
   {path: 'historypage', component: HistorypageComponent},
   {path:'exportxl' , component:ExportxlComponent},
   {path:'mappage' , component:MapComponent},
   {path:'organization' , component:OrganizatioComponent} ,
   {path:'dept' , component:DepartmentComponent},
   {path:'designation' , component:DesignationComponent},
   {path:'role' , component:RoleComponent},
   {path:'manualpage' , component:ManualformComponent},
   {path:'docupload' , component:UploadDocumentComponent},
   {path:'medialink' , component:MediaplayerComponent}
   
   




   
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
