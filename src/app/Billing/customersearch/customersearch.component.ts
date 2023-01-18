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
    });
   }

  ngOnInit(): void {
    this.databaseService.getCustomerDetails();
  }

  //Customer details variable
  Customerdetails:any;  //Customer details list from service
  customer:any;         //Customer phone number from user
  CustomerName:any;     //Customer name will show to user

  //Filter the phone number by user provided number and giving the customer name accordingly
//Else will notify add new customer
save(){
  console.log(this.customer)
  this.CustomerName = this.Customerdetails.filter((phone:any)=>phone.customerPhone ==this.customer );
  if(this.CustomerName.length>0){
    this.CustomerName = this.CustomerName[0].customerName;
    this.databaseService.customerId.next(this.CustomerName[0].customerId);
    console.log(this.CustomerName);
  }
  else{this.CustomerName = 'notfound';}
}

}
