import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./components/main/main.component";
import {RoleGuard} from "../auth/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
