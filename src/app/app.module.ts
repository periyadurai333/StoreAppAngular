import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { MatmoduleModule } from './matmodule/matmodule.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillComponent } from './Billing/bill/bill.component';
import { StockComponent } from './stock/stock.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { TableComponent } from './table/table.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

import { DatabaseService } from './service/database.service';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CustomersearchComponent } from './Billing/customersearch/customersearch.component';
import { BillTableComponent } from './Billing/bill-table/bill-table.component';
import { BillFormComponent } from './Billing/bill-form/bill-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    BillComponent,
    StockComponent,
    NewproductComponent,
    TableComponent,    
    DialogContentComponent, 
    NewcustomerComponent, 
    SnackbarComponent, CustomersearchComponent, BillTableComponent, BillFormComponent, LoginFormComponent, NewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatmoduleModule
  ],
  providers: [DatabaseService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000,horizontalPosition: 'right', verticalPosition: 'top'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
