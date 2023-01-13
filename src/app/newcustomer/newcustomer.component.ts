import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public databaseservice: DatabaseService, private _snackBar: MatSnackBar, private router: Router) { }
  newCustomer: FormGroup | any;

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.newCustomer = this.formBuilder.group({
      CustomerPhone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]),
      CustomerName: new FormControl('', Validators.required)
    });
  }

  refreshComponent() {
    this.router.navigate([this.router.url]);
  }

  save() {
    this.databaseservice.postCustomerDetails(this.newCustomer.value).subscribe({
      next: (res: any) => {
        const add_1 = "Added " + res.customerName;
        this._snackBar.openFromComponent(SnackbarComponent, { data: add_1 });
        this.router.navigate(['bill']);},
      error: (err) => { this._snackBar.openFromComponent(SnackbarComponent, { data: err.error }); }
    });
  }

  showError(): any {
    const field = this.newCustomer.get('CustomerPhone');

    if (field.hasError('required')) {return 'The Phone number is required';}
    if (field.hasError('minlength')) {return '10 digit phone number is required';}
    if (field.hasError('pattern')) {return 'Numbers only allowed';}
  }

  showError1(): any {
    const field = this.newCustomer.get('CustomerName');

    if (field.hasError('required')) {return 'Customer name is required';}
  }

}