import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public databaseservice: DatabaseService, private _snackBar: MatSnackBar, private router: Router) { }
  LoginDetails:any;
  hide :boolean = true;

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.LoginDetails = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      Role : new FormControl('',[Validators.required])
    });
    if(localStorage.getItem('token')!=null){
      this.databaseservice.hide.next(true);
      this.router.navigate(['/stock']);
    }
  }

  Login(){
    console.log(this.LoginDetails.value);
    this.databaseservice.LoginCheck(this.LoginDetails.value).subscribe(
      {next : (res:any) => {
      //console.log(res.token); 
      localStorage.setItem('token',res.token);
      this.databaseservice.hide.next(true);
      this.router.navigate(['/stock']);
    },
    error : (err) => {
      console.log(err.error);
      this._snackBar.openFromComponent(SnackbarComponent, { data: err.error });
    }}
    );
  }

}
