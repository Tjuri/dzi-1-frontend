import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AngularMaterialModule} from "./ui/material.module";
import { HomeComponent } from './components/home/home.component';
import { CreateEditConfigComponent } from './components/create-edit-config/create-edit-config.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AddFieldToConfigDialogComponent } from './dialogs/add-field-to-config-dialog/add-field-to-config-dialog.component'
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { EditIdsInConfigDialogComponent } from './dialogs/edit-ids-in-config-dialog/edit-ids-in-config-dialog.component';



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreateEditConfigComponent,
        AddFieldToConfigDialogComponent,
        EditIdsInConfigDialogComponent,
        MessageDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        // UI
        AngularMaterialModule,
        // Libs
        NgJsonEditorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}


