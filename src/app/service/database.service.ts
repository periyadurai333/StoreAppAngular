import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerDTO } from './CustomerDTO';
import { EmployeeDTO } from './EmployeeModel';
import { ProductDTO } from './ProductModel';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  readonly ProductURL   = 'https://localhost:7172/api/Products';
  readonly CustomerURL  = 'https://localhost:7172/api/Customers';
  readonly EmployeeURL  = 'https://localhost:7172/api/Employees';
  readonly LoginURL     = 'https://localhost:7172/api/Login';

  public ProductActiveDetails:any   = new Subject<any>();
  public ProductDeActiveDetails:any = new Subject<any>();
  public CustomerDetails:any        = new Subject<any>();

  public Bill:any = new Subject<any>();
  public total:any = new Subject<any>();

  constructor(private httpclient : HttpClient) {  
    
   }
  
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

  postCustomerDetails(data:CustomerDTO){
    return this.httpclient.post(this.CustomerURL,data);
  }

  postEmployeeDetails(employee : EmployeeDTO){
    return this.httpclient.post(this.EmployeeURL,employee);
  }
}
