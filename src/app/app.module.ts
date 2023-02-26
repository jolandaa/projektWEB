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
import {AppNotificationModule} from "./shared/components/app-notification/app-notification.module";
import { ForgotPasswComponent } from './shared/components/forgot-passw/forgot-passw.component';
import { SuccessCreationModalComponent } from './shared/modals/success-creation-modal/success-creation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ForgotPasswComponent,
    SuccessCreationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    AppNotificationModule,

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
