import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {AddFieldToConfigDialogComponent} from 'src/app/dialogs/add-field-to-config-dialog/add-field-to-config-dialog.component';
import {Router} from "@angular/router";

@Component({
    selector: 'app-create-edit-config',
    templateUrl: './create-edit-config.component.html',
    styleUrls: ['./create-edit-config.component.scss']
})
export class CreateEditConfigComponent implements OnInit {

    public json = '';
    public editorOptions: JsonEditorOptions;
    public data: any;
    public isLoading = false;
    @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent = new JsonEditorComponent();

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
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
                    value: 'akku_status',
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
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'ID'}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    console.log(data)
                    let dataTemp = Object.assign({}, this.data);
                    dataTemp.nms_id.path = [data.path];
                    dataTemp.nms_id.value = data.value;
                    this.data = dataTemp;
                }
            });
    }

    addValue() {
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'ID'}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    let dataTemp = Object.assign({}, this.data);
                    dataTemp.values.push({
                        path: data.path,
                        value: data.value
                    });
                    this.data = dataTemp;
                }
            });
    }

    save() {
        console.log(this.editor.getText())
        // TODO
        this.router.navigate([''])
    }
}
