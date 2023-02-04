import {NgModule} from "@angular/core";
import {ClientRoutingModule} from "./client-routing.module";
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    ClientRoutingModule
  ],
  providers: [

  ]
})
export class ClientModule {}
