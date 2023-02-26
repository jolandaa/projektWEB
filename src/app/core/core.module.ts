import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        RouterModule,
        MatMenuModule,
    ],
  exports: [
    SidebarComponent,
    HeaderComponent

  ]
})
export class CoreModule { }
