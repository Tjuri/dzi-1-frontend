import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-field-to-config-dialog',
  templateUrl: './add-field-to-config-dialog.component.html',
  styleUrls: ['./add-field-to-config-dialog.component.scss']
})
export class AddFieldToConfigDialogComponent implements OnInit {

  fieldName: string = '';
  inputData = {
    path: '',
    value: ''
  };

  constructor(public dialogRef: MatDialogRef<AddFieldToConfigDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { fieldName: string}) { }

  ngOnInit(): void {
    this.fieldName = this.data.fieldName;
  }

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }
}
