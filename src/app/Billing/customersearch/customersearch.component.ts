import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-customersearch',
  templateUrl: './customersearch.component.html',
  styleUrls: ['./customersearch.component.css']
})
export class CustomersearchComponent implements OnInit {

  constructor(public databaseService:DatabaseService) {
    //Loading Customer details in this component
    this.databaseService.CustomerDetails.subscribe((res:any)=>{
      this.Customerdetails = res;
      //console.log(this.Customerdetails)
    });
   }

  ngOnInit(): void {
    this.databaseService.getCustomerDetails();
  }

  //Customer details variable
  Customerdetails:any;  //Customer details list from service
  customer:any;         //Customer phone number from user
  CustomerName:any;     //Customer name will show to user
  CustomerPhone:number=0;

  //Filter the phone number by user provided number and giving the customer name accordingly
//Else will notify add new customer
Check(){
  this.customer = this.Customerdetails.filter((phone:any)=>phone.customerPhone ==this.CustomerPhone );
  if(this.customer.length>0){
    this.customer = this.customer[0];
    this.databaseService.customerId.next(this.customer);
    this.CustomerName=this.customer.customerName;
    
  }
  else{
    this.databaseService.customerId.next('notfound');
    //this.CustomerName = 'notfound';
  }
}

}
