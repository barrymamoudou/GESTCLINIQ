import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { Authentication2Guard } from './guards/authentication2.guard';
import { AuthguardGuard } from './services/authguard.guard';


const routes: Routes = [
  {path:'login',component:LoginComponent,
 canActivate:[Authentication2Guard]
},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard',component:SidebarComponent, canActivate:[AuthenticationGuard],children:[
    {path:'',redirectTo:'',pathMatch:'full'},
    {path:'patient',component:PatientComponent},
    {path:'doctor',component:DoctorComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],




exports: [RouterModule]
})
export class AppRoutingModule { }
