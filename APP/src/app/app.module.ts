import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {JoinRoom} from './joinroom/joinroom';
import {Dashboard} from './dashboard/dashboard';
import {Sample} from './joinroom/sample/sample';
import {SampleOne} from './joinroom/sample1/sample1';
import {LoginComponent} from './login/login';
import { AuthGuard } from './app.authguard';


@NgModule({
  declarations: [AppComponent, JoinRoom, Dashboard, Sample, SampleOne, LoginComponent],
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
