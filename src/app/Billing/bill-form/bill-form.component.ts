import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  //Product details variables
  ProductList:any[] = [];   //Product details list from service
  ProductPrice:any;
  newOrder: FormGroup | any;
  Bill : any []=[];
  total:number = 0.00;         //Total amount to be shown in bill
  duplicate:boolean=false;

  constructor(public databaseService: DatabaseService,private formBuilder: FormBuilder,private router: Router) { 
    //Loading product details in this component
    this.databaseService.ProductActiveDetails.subscribe((res:any) => {
      this.ProductList = res;
    });
  }

  ngOnInit(): void {
    this.newOrder = this.formBuilder.group({
      ProductName : new FormControl('',Validators.required),
      ProductCount : new FormControl('',Validators.required),
      Price : new FormControl(''),
      Total:new FormControl('')
    });
    this.databaseService.getProductActiveDetails();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  Add(){
    this.ProductPrice = this.ProductList.filter((name:any)=>name.productName ==this.newOrder.value.ProductName);
    this.newOrder.value.Price = this.ProductPrice[0].price;
    this.newOrder.value.Total = this.newOrder.value.ProductCount * this.ProductPrice[0].price;
    this.total = this.total + (this.newOrder.value.Total);
     this.Bill.forEach(element => {
       if(element.ProductName==this.newOrder.value.ProductName && element.Price==this.newOrder.value.Price){
         element.ProductCount = Number(element.ProductCount)+Number(this.newOrder.value.ProductCount);
         element.Total= Number(element.Total)+Number(this.newOrder.value.Total);
         this.duplicate=true;
         console.log(element);
       }
     });
    console.log(this.Bill);
    if(!this.duplicate){
      this.Bill.push(this.newOrder.value);
    }
    this.databaseService.Bill.next(this.Bill);
    this.databaseService.total.next(this.total);
    this.newOrder.reset();
    //this.router.navigate([this.router.url]);    
  }

}
