import { Component } from '@angular/core';
import { DatabaseService } from './service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StoreAppAngular';
  hide: any;
  constructor(private databaseService: DatabaseService){
    this.databaseService.hide.subscribe((res: any) => { this.hide = res});
  }
  
  ngOnInit(){
  }
}
