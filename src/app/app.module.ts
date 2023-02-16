import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SigninComponent} from "./shared/components/signin/signin.component";
import {TOKEN_INTERCEPTOR} from "./auth/interceptors";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    TOKEN_INTERCEPTOR,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}

  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
