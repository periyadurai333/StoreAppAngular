import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,public databaseservice: DatabaseService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.databaseservice.hide.next(false);
  }

}
