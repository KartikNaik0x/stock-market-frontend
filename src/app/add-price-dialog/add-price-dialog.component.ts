
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-add-price-dialog',
  templateUrl: './add-price-dialog.component.html',
  styleUrls: ['./add-price-dialog.component.css'],
})
export class AddPriceDialogComponent {
  price : number | undefined;
  constructor(
    public dialogRef: MatDialogRef<AddPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAddClick(): void {
    this.dialogRef.close(this.price);
  }
}