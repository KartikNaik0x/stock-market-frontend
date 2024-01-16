import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-company-dialog',
  templateUrl: './update-company-dialog.component.html',
  styleUrls: ['./update-company-dialog.component.css'],
})
export class UpdateCompanyDialogComponent {
  updateForm: FormGroup;
  isCompanyCodeDisabled: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UpdateCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm = new FormGroup({
      companyCode: new FormControl(data.companyCode, [Validators.required]),
      companyName: new FormControl(data.companyName, [Validators.required]),
      companyCEO: new FormControl(data.companyCEO, [Validators.required]),
      companyTurnover: new FormControl(data.companyTurnover, [Validators.required]),
      companyWebsite: new FormControl(data.companyWebsite, [Validators.required]),
      stockExchange: new FormControl(data.stockExchange, [Validators.required]),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onUpdateClick(): void {
    if (this.updateForm.valid) {
      // Pass the updated data back to the parent component
      this.dialogRef.close(this.updateForm.value);
    } else {
      console.error('Invalid form data:', this.updateForm.value);
    }
  }
}