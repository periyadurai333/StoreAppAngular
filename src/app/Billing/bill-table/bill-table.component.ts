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
  Columns : any []=['productname','quantity','price','total'];
  constructor(public databaseservice : DatabaseService) { 
    this.databaseservice.Bill.subscribe((res:any)=>{this.Datasource = new MatTableDataSource(res);console.log(this.Datasource)})
    this.databaseservice.total.subscribe((res:any)=> this.total = res);
  }

  ngOnInit(): void {
  }

  save(){
    this.databaseservice.postBillDetails();
  }

}
