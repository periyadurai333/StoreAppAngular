import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogData } from '../DialogData';
import { DatabaseService } from '../service/database.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  ngOnInit(): void {
  }


  deleted : any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar, private databaseService: DatabaseService, public router : Router ){
  console.log(data);
  }

  deleteRow(id: any) {
    this.databaseService.deleteProductDetails(id).subscribe(res => {
      this.deleted = res;
      this._snackBar.openFromComponent(SnackbarComponent, {data: 'Deleted '+this.deleted.productName});
      this.databaseService.getProductActiveDetails();
      this.databaseService.getProductDeActiveDetails();
    });
  }

}
