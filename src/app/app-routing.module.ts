import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./shared/components/signin/signin.component";
import {ForgotPasswComponent} from "./shared/components/forgot-passw/forgot-passw.component";
import {SuccessRequestComponent} from "./shared/components/success-request/success-request.component";

const routes: Routes = [
  {
    path: "login",
    component: SigninComponent,
  },
  {
    path: "forgot-passw/:token/:email",
    component: ForgotPasswComponent,
  },
  {
    path: "success-requested",
    component: SuccessRequestComponent,
  },
  {
    path: "client",
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  },
  {
    path: "admin",
    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule),
  },
  {
    path: '**',
    redirectTo: 'client'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
