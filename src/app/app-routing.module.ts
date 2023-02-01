import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './Billing/bill/bill.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { MarketDetailsComponent } from './market-details/market-details.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {path:'', redirectTo:'marketdetails',pathMatch:'full'},
  {path:'bill', component : BillComponent, canActivate:[AuthGuard]},
  {path:'stock', component: StockComponent,canActivate:[AuthGuard]},
  {path:'newproduct', component:NewproductComponent, canActivate:[AuthGuard]},
  {path:'newcustomer', component: NewcustomerComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginFormComponent},
  {path:'logout', component: LogoutComponent},
  {path:'newemployee', component:NewEmployeeComponent, canActivate:[AuthGuard]},
  {path:'marketdetails', component: MarketDetailsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
