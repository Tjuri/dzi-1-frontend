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


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CreateEditConfigComponent
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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}


