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
import * as moment from "moment";

@Component({
    selector: 'app-create-edit-config',
    templateUrl: './create-edit-config.component.html',
    styleUrls: ['./create-edit-config.component.scss']
})
export class CreateEditConfigComponent implements OnInit {

    public param_configId = null;
    public configContainer: ConfigContainer = new ConfigContainer('', '', '');
    public unsavedConfigContainer: ConfigContainer = new ConfigContainer('', '', '');
    public editorOptions: JsonEditorOptions;
    public isEditConfig = false;
    public configId: string = '';

    public isFreshConfig = false;
    public hasUnsavedChanges = false;
    public isLoading = false;
    public isError = false;
    public noIdError = false;
    public isSaving = false;
    public isRevertingChanges = false;

    createdFormated = '';
    lastModifiedFormated = '';
    @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent = new JsonEditorComponent();

    jsonChangedSubscription: BehaviorSubject<string> = new BehaviorSubject<string>('');

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
        this.jsonChangedSubscription = new BehaviorSubject<string>('');
        this.subscribeForJsonChanges();

        this.route.params
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(params => {
                const param_configId = params['id'];
                console.log('param_configId', param_configId)
                if (param_configId) {
                    this.isEditConfig = true;
                    this.param_configId = param_configId;
                    this.loadConfigById(param_configId);
                } else {
                    this.configContainer = new ConfigContainer('', '', '');
                    this.isFreshConfig = true;
                }
            });
    }

    subscribeForJsonChanges() {
        this.jsonChangedSubscription
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(value => {
                if (value) {
                    this.hasUnsavedChanges = true;
                    this.unsavedConfigContainer = JSON.parse(value);
                }
            })
    }

    saveConfig() {
        if (this.unsavedConfigContainer.nms_id?.values?.length > 0) {
            this.noIdError = false;
            this.isSaving = true;
            if (this.isFreshConfig) {
                this.configDataService.createConfig(this.unsavedConfigContainer)
                    .subscribe(() => {
                        this.isFreshConfig = false;
                        this.hasUnsavedChanges = false;
                        this.isSaving = false;
                        this.router.navigateByUrl(`edit-config/${this.configContainer.configId}`)
                    })
            } else {
                this.configDataService.updateConfig(this.unsavedConfigContainer, this.configContainer.configId)
                    .subscribe(() => {
                        this.hasUnsavedChanges = false;
                        this.isSaving = false;
                        if (this.unsavedConfigContainer.configId !== this.configContainer.configId) {
                            this.router.navigateByUrl(`edit-config/${this.configContainer.configId}`)
                        } else {
                            this.configContainer = this.unsavedConfigContainer;
                        }
                    })
            }
        } else {
            this.noIdError = true;
        }
    }

    revertChanges() {
        this.isRevertingChanges = true;
        this.unsavedConfigContainer = this.configContainer;
        this.hasUnsavedChanges = false;
        setTimeout(() => this.isRevertingChanges = false, 1000)
    }

    loadConfigById(id: string) {
        this.isLoading = true;
        this.configDataService.getConfigById(id)
            .subscribe(configContainer => {
                this.configId = id;
                this.configContainer = configContainer;
                this.lastModifiedFormated = moment(configContainer.lastModified).format('LLL')
                this.createdFormated = moment(configContainer.lastModified).format('LLL')
                this.isLoading = false;
            }, error => {
                this.isError = true;
                this.isLoading = false;
            });
    }

    addId() {
        const path = this.configContainer?.nms_id?.path;
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'ID', path}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    let dataTemp = Object.assign({}, this.configContainer);
                    dataTemp.nms_id.path = data.path;
                    dataTemp.nms_id.values.push(data.value);
                    this.configContainer = dataTemp;
                }
            });
    }

    addValue() {
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'ID'}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    let dataTemp = Object.assign({}, this.configContainer);
                    dataTemp.values.push({
                        path: data.path,
                        key: data.value
                    });
                    this.configContainer = dataTemp;
                }
            });
    }

    jsonChanged(event: any) {
        console.log(event)
        this.jsonChangedSubscription.next(this.editor.getText());
    }

    back() {
        this.router.navigate([''])
    }

    getConfigIDs() {
        return this.configContainer.configId;
    }
}
