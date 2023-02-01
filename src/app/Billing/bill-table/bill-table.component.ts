import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  Datasource:any = new MatTableDataSource();
  total:number = 0.00;         //Total amount to be shown in bill
  Customer:any;
  CustomerId:number=0;
  Columns : any []=['productname','quantity','price','total'];
  constructor(public databaseservice : DatabaseService) { 
    this.databaseservice.Bill.subscribe((res:any)=>{this.Datasource = new MatTableDataSource(res);})
    this.databaseservice.total.subscribe((res:any)=> this.total = res);
    this.databaseservice.customerId.subscribe((res:any)=>{
      if(res == 'notfound'){this.Customer=res}
      else{this.Customer=res.customerName;
      this.CustomerId=res.customerId}
      })
  }

  ngOnInit(): void {
  }

  save(){
    //console.log(this.Datasource.filteredData);
    this.databaseservice.postBillDetails(this.Datasource.filteredData,this.CustomerId, this.total).
    subscribe((res:any)=>{console.log(res)});
  }

}
