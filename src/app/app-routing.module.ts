import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'home', component : HomeComponent },
  { path: 'register', component : RegisterComponent },
  { path: 'user', component : UserComponent },
  { path: 'admin', component : AdminComponent },
  { path: 'addcompany', component : AddcompanyComponent },
  { path: 'login', component : LoginComponent },
  { path: 'forbidden', component : ForbiddenComponent },
  { path: 'companydetails', component : CompanydetailsComponent },
  { path: 'statistics/:companyCode', component: StatisticsComponent },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
