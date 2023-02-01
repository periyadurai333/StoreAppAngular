import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BillDetailsDTO } from '../DTOs/BillDetailsDTO';
import { CustomerModel } from '../DTOs/CustomerModel';
import { EmployeeModel } from '../DTOs/EmployeeModel';
import { LoginDetailsModel } from '../DTOs/LoginDetailsModel';
import { ProductDTO } from '../DTOs/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  readonly ProductURL   = 'https://localhost:7172/api/Products';
  readonly CustomerURL  = 'https://localhost:7172/api/Customers';
  readonly EmployeeURL  = 'https://localhost:7172/api/Employees';
  readonly LoginURL     = 'https://localhost:7172/api/Login';
  readonly BillURL      = 'https://localhost:7172/api/Bills';

  public ProductActiveDetails:any   = new Subject<any>();
  public ProductDeActiveDetails:any = new Subject<any>();
  public CustomerDetails:any        = new Subject<any>();

  public Bill:any = new Subject<any>();
  public total:any = new Subject<any>();
  public customerId = new Subject<any>();

  public hide:any = new BehaviorSubject<boolean>(false);
  public Role:any = new Subject<any>();
  public UserName:any = new Subject<any>();

  constructor(private httpclient : HttpClient) {  }
  
  getProductActiveDetails(){
    this.httpclient.get(this.ProductURL+'/-1').subscribe(res => {
      this.ProductActiveDetails.next(res);
  });
  
  }
  getProductDeActiveDetails(){
    this.httpclient.get(this.ProductURL+'/-2').subscribe(res => {
      this.ProductDeActiveDetails.next(res);
    });
  }

  postProductDetails(data:ProductDTO){
    return this.httpclient.post(this.ProductURL,data);
  }

  deleteProductDetails(id:Number){
    return this.httpclient.delete(this.ProductURL+'/'+id);
  }

  getCustomerDetails(){
    this.httpclient.get(this.CustomerURL).subscribe(res => {
      this.CustomerDetails.next(res);});
  }

  postCustomerDetails(data:CustomerModel){
    return this.httpclient.post(this.CustomerURL,data);
  }

  postEmployeeDetails(employee : EmployeeModel){
    return this.httpclient.post(this.EmployeeURL,employee);
  }

  LoginCheck(loginDetails : LoginDetailsModel){
    console.log("JWT Hitted")
    return this.httpclient.put(this.LoginURL,loginDetails);
  }

  postLoginDetails(loginDetails: LoginDetailsModel){
    return this.httpclient.post(this.LoginURL,loginDetails);
  }
  postBillDetails(bill:BillDetailsDTO, customerid:number, total:number){
    const data =  {"Bill" : JSON.stringify(bill), "CustomerId" : customerid, "TotalAmount": total};
    return this.httpclient.post(this.BillURL,data);
  }
}
