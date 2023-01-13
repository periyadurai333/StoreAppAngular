import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input()
  ProductDetails : any = new MatTableDataSource();
  @Input()
  Columns : any;

  ngOnInit(): void {
  }
  @ViewChild(MatSort) sort! : MatSort;
  sortDataActive(sort: Sort) { this.ProductDetails.sort = this.sort; }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.ProductDetails.filter = filterValue;
  }

  openDialog(Product:any) {
    const dialogRef = this.dialog.open(DialogContentComponent,{
      data:{
        Product
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}