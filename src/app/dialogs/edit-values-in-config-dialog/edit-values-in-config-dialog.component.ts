import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";
import {ConfigContainer} from "../../model/ConfigContainer";

@Component({
    selector: 'app-edit-values-in-config-dialog',
    templateUrl: './edit-values-in-config-dialog.component.html',
    styleUrls: ['./edit-values-in-config-dialog.component.scss']
})
export class EditValuesInConfigDialogComponent implements OnInit {

    values: { key: string, path: string }[] = [];
    selectedValue: { key: string, path: string } = {key: '', path: ''};

    constructor(public dialogRef: MatDialogRef<EditValuesInConfigDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { values: any }) {
    }

    ngOnInit(): void {
        if (this.data.values && this.data.values.length > 0) {
            this.values = Object.assign([], this.data.values);
        } else {
            this.values.push({key: '', path: ''});
        }
        this.selectedValue = this.values[0];
    }

    removeValue(index: any) {
        this.values = this.values.filter((v, i) => i !== index);
        if (this.values.length > 0) {
            this.selectedValue = this.values[0];
        }
    }

    selectValue(value: any) {
        this.selectedValue = value;
    }

    addValue() {
        this.values.push({key: '', path: ''});
        this.selectedValue = this.values[this.values.length - 1];
    }

    closeDialog(data?: any) {
        console.log("data", data);
        console.log("configContainer", this.data.values);
        this.dialogRef.close(data);
    }
}
