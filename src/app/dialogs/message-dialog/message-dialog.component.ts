import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

    public message = '';

    constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { message: string }) {
    }

    ngOnInit(): void {
        this.message = this.data.message;
    }

    closeDialog(data?: any) {
        this.dialogRef.close(data);
    }
}
