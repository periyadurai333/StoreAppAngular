import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './Billing/bill/bill.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {path:'bill', component : BillComponent},
  {path:'stock', component: StockComponent},
  {path:'newproduct', component:NewproductComponent},
  {path:'newcustomer', component: NewcustomerComponent},
  {path:'login', component:LoginFormComponent},
  {path:'newemployee', component:NewEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
