import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./shared/components/signin/signin.component";

const routes: Routes = [
  {
    path: "login",
    component: SigninComponent,
  },
  {
    path: "",
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  },
  {
    path: "system-panel",
    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
