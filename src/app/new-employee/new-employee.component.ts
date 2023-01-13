import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public databaseservice: DatabaseService, private _snackBar: MatSnackBar, private router: Router) { }
  newEmployee:any;
  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.newEmployee = this.formBuilder.group({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', Validators.required),
      Phone : new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]),
      Email : new FormControl(''),
      Address : new FormControl('')
    });
  }
  refreshComponent() {
    this.router.navigate([this.router.url]);
  }

  save() {
    this.databaseservice.postEmployeeDetails(this.newEmployee.value).subscribe({
      next: (res: any) => {
        console.log(res);
        const add_1 = "Added " + res.firstName+res.lastName;
        this._snackBar.openFromComponent(SnackbarComponent, { data: add_1 });
        this.refreshComponent;},
      error: (err) => { this._snackBar.openFromComponent(SnackbarComponent, { data: err.error }); }
    });
  }

}
