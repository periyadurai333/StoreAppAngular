import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

  constructor(public databaseService: DatabaseService, private _snackBar: MatSnackBar, private router: Router) { }

  newProduct  = new FormGroup({
    ProductCode : new FormControl(''),
    ProductName : new FormControl(''),
    Price : new FormControl(''),
    Count : new FormControl('')
  })

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  refreshComponent(){
    this.router.navigate([this.router.url]);
  }

  onSubmit() {
    this.databaseService.postProductDetails(this.newProduct.value).subscribe({
      next: (res: any) => {
        const add_1 = "Added " + res.ProductName;
        this._snackBar.openFromComponent(SnackbarComponent, {data: add_1});
        this.refreshComponent();
      },
      error: (err) => { this._snackBar.openFromComponent(SnackbarComponent, { data: err.error }); }
    });
  }

  

}
