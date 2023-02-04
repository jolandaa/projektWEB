import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./shared/components/signin/signin.component";
import {AuthGuard} from "./auth/guards/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: SigninComponent,
  },
  {
    path: "client",
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  },
  {
    path: "",
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
