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
import {MessageDialogComponent} from "../../dialogs/message-dialog/message-dialog.component";
import {EditIdsInConfigDialogComponent} from "../../dialogs/edit-ids-in-config-dialog/edit-ids-in-config-dialog.component";
import {FormControl} from "@angular/forms";

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
    public isRerenderingJsonInput = false;

    createdFormated = '';
    lastModifiedFormated = '';
    @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent = new JsonEditorComponent();

    jsonChangedSubscription: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    configIdFormControl = new FormControl();

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
        console.log(this.unsavedConfigContainer)
        if (this.unsavedConfigContainer.nms_id?.values?.length > 0 && !!this.unsavedConfigContainer.configId && this.unsavedConfigContainer.configId === this.configId) {
            this.noIdError = false;
            this.isSaving = true;
            if (this.isFreshConfig) {
                this.configDataService.createConfig(this.unsavedConfigContainer)
                    .subscribe(() => {
                        this.isFreshConfig = false;
                        this.hasUnsavedChanges = false;
                        this.isSaving = false;
                        this.router.navigateByUrl(`edit-config/${this.unsavedConfigContainer.configId}`)
                    }, error => {
                        this.handleSaveError();
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
                    }, error => {
                        this.handleSaveError();
                    })
            }
        } else {
            this.noIdError = true;
        }
    }

    revertChanges() {
        this.isRerenderingJsonInput = true;
        this.unsavedConfigContainer = this.configContainer;
        this.hasUnsavedChanges = false;
        setTimeout(() => this.isRerenderingJsonInput = false, 1000);
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
        this.dialog.open(AddFieldToConfigDialogComponent, {data: {fieldName: 'nms_id', path}})
            .afterClosed()
            .subscribe((data: { value: string, path: string }) => {
                if (data?.value && data?.path) {
                    let dataTemp = Object.assign({}, this.configContainer);
                    dataTemp.nms_id.path = data.path;
                    dataTemp.nms_id.values.push(data.value);
                    this.unsavedConfigContainer = dataTemp;
                    // this.hasUnsavedChanges = true;
                    this.saveConfig();
                    // this.rerenderConfig();
                }
            });
    }

    editValues() {
        this.dialog.open(EditIdsInConfigDialogComponent, {data: {values: Object.assign([], this.configContainer.values)}})
            .afterClosed()
            .subscribe((values: any) => {
                console.log(values)
                if (values) {
                    let dataTemp = Object.assign({}, this.configContainer);
                    dataTemp.values = values;
                    this.configContainer = dataTemp;
                    this.unsavedConfigContainer = dataTemp;
                    // this.hasUnsavedChanges = true;
                    this.saveConfig();
                    // this.rerenderConfig();
                }
            });
    }

    jsonChanged(event: any) {
        this.jsonChangedSubscription.next(this.editor.getText());
    }

    back() {
        this.router.navigate([''])
    }

    getConfigIDs() {
        return this.configContainer.configId;
    }

    handleSaveError() {
        this.configDataService.getConfigById(this.unsavedConfigContainer.configId)
            .subscribe(configContainer => {
                if (this.isFreshConfig) {
                    this.dialog.open(MessageDialogComponent, {data: {message: `The configId '${this.unsavedConfigContainer.configId}' does already exist. Please choose another one.`}})
                } else {
                    this.dialog.open(MessageDialogComponent, {data: {message: 'An error occured. Please check the JSON data.'}})
                }
            }, error => {
                this.dialog.open(MessageDialogComponent, {data: {message: 'An error occured. Please check the JSON data.'}})
            });
    }

    rerenderConfig() {
        this.isRerenderingJsonInput = true;
        setTimeout(() => this.isRerenderingJsonInput = false, 1000);
    }

    mainInputChanged() {
        this.rerenderConfig();
        let dataTemp = Object.assign({}, this.configContainer);
        this.unsavedConfigContainer = dataTemp;
        this.hasUnsavedChanges = true;
    }
}
