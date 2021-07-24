import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';

@Component({
    selector: 'app-create-edit-config',
    templateUrl: './create-edit-config.component.html',
    styleUrls: ['./create-edit-config.component.scss']
})
export class CreateEditConfigComponent implements OnInit {

    public json = '';
    public editorOptions: JsonEditorOptions;
    public data: any;
    @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent = new JsonEditorComponent();

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'tree'];
        this.editorOptions.mode = 'code';
        this.data = {
            nms_id: {
                path: ['ip'],
                value: '',
            },
            values: [
                {
                    path: '',
                    key: 'akku_status',
                }
            ],
            adhoc: false,
            required: ['akku_stand', 'ip_adresse']
        }
    }

    ngOnInit(): void {
    }

    jsonChanged(event: any) {
        console.log(event)
        this.json = event;
    }

    addId() {

    }

    addValue() {

    }

    save() {
        console.log(this.editor.getText())
        // TODO: Save
    }
}
