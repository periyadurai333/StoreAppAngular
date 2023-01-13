import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  ProductActiveDetails: any;
  ProductDeActiveDetails: any;
  displayedColumns: string[] = ['id', 'productCode', 'productName', 'price', 'count', 'totalSold', 'Actions'];
  displayedColumnsDe: string[] = ['id', 'productCode', 'productName', 'price', 'count', 'totalSold'];

  constructor(private databaseService: DatabaseService) {
    this.databaseService.ProductActiveDetails.subscribe((res: any) => { this.ProductActiveDetails = new MatTableDataSource(res);});
    this.databaseService.ProductDeActiveDetails.subscribe((res: any) => { this.ProductDeActiveDetails = new MatTableDataSource(res);
    console.log("Stock constructor")});
  }

  ngOnInit(): void {
    this.databaseService.getProductActiveDetails();
    this.databaseService.getProductDeActiveDetails();
  }

}
