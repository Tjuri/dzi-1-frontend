import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import {AddFieldToConfigDialogComponent} from 'src/app/dialogs/add-field-to-config-dialog/add-field-to-config-dialog.component';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";
import {ConfigDataService} from 'src/app/services/config-data.service';
import {ConfigContainer} from "../../model/ConfigContainer";

@Component({
    selector: 'app-create-edit-config',
    templateUrl: './create-edit-config.component.html',
    styleUrls: ['./create-edit-config.component.scss']
})
export class CreateEditConfigComponent implements OnInit {

    public param_configId = null;
    public configContainer: ConfigContainer = new ConfigContainer('', '', '');
    public editorOptions: JsonEditorOptions;
    public isEditConfig = false;
    public configId: string = '';

    public isLoading = false;
    public isError = false;
    public noIdError = false;
    public isSaving = false;

    @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent = new JsonEditorComponent();

    saveValuesSubscription: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private configDataService: ConfigDataService,
    ) {
        this.editorOptions = new JsonEditorOptions()
        this.editorOptions.modes = ['code', 'tree'];
        this.editorOptions.mode = 'code';

    }

    ngOnInit(): void {
        this.saveValuesSubscription = new BehaviorSubject<string>('');
        this.subscribeForJsonChanges();

        this.route.params
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(params => {
                const param_configId = params['id'];
                if (param_configId) {
                    this.param_configId = param_configId;
                    this.isEditConfig = true;
                    this.loadConfigById(param_configId);
                } else {
                    this.configContainer = new ConfigContainer('', '', '');
                }
            });
    }

    subscribeForJsonChanges() {
        this.saveValuesSubscription
            .pipe(takeUntil(this.ngUnsubscribe),
                debounceTime(1000))
            .subscribe(value => {
                if (value) {
                    this.configContainer.config = JSON.parse(value);
                    this.saveConfigById();
                }
            })
    }

    saveConfigById() {
        if (this.configContainer.config.nms_id?.values?.length > 0) {
            this.noIdError = false;
            this.configDataService.updateConfig(this.configContainer)
                .subscribe(() => {
                    this.isSaving = false;
                })
        } else {
            this.noIdError = true;
        }
    }

    loadConfigById(id: string) {
        this.isLoading = true;
        this.configId = id;
        this.configDataService.getConfigById(id)
            .subscribe(configContainer => {
                this.configContainer = configContainer;
                this.isLoading = false;
            }, error => {
                this.isError = true;
                this.isLoading = false;
            });
    }

    addId() {
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'ID'}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    let dataTemp = Object.assign({}, this.configContainer.config);
                    dataTemp.nms_id.path = data.path;
                    dataTemp.nms_id.values.push(data.value);
                    this.configContainer.config = dataTemp;
                }
            });
    }

    addValue() {
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'ID'}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    let dataTemp = Object.assign({}, this.configContainer.config);
                    dataTemp.values.push({
                        path: data.path,
                        key: data.value
                    });
                    this.configContainer.config = dataTemp;
                }
            });
    }

    jsonChanged(event: any) {
        console.log(event)
        this.saveValuesSubscription.next(this.editor.getText());
    }

    back() {
        this.router.navigate([''])
    }

    getConfigIDs() {
        return this.configContainer.configId;
    }
}
