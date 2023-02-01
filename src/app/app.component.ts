import { Component } from '@angular/core';
import { userInfo } from 'os';
import { DatabaseService } from './service/database.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StoreAppAngular';
  hide: any;
  Role : any;
  UserName:String = "";
  tokenInfo:any;

  constructor(private databaseService: DatabaseService){
    this.databaseService.hide.subscribe((res: any) => { this.hide = res});
    this.databaseService.Role.subscribe((res: any) => { this.Role = res;});
    this.databaseService.UserName.subscribe((res: any) => { this.UserName = res;});
  }
  
  ngOnInit(){
    const token:any = localStorage.getItem('token')
    this.tokenInfo = jwt_decode(token);
    //console.log(this.tokenInfo);
    this.databaseService.Role.next(this.tokenInfo.role);
    this.databaseService.UserName.next(this.tokenInfo.unique_name);
  }
}
