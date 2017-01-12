import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {JoinRoom} from './joinroom/joinroom';
import {Dashboard} from './dashboard/dashboard';
import {ChatRoom} from './chatroom/chatroom';
import {LoginComponent} from './login/login';
import {Ground} from './ground/ground';
import { AuthGuard } from './app.authguard';
import { HttpServices } from './shared/services/httpService';
import { Config } from './config/config';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {FocusGame} from './shared/components/games/focus/focus';
import {UnoGame} from './shared/components/games/uno/uno';
import { SortPipe } from './shared/pipes/sort';

let options = <ToastOptions>{
  animate: 'flyRight',
  positionClass: 'toast-bottom-right',
  toastLife: 5000
};

@NgModule({
  declarations: [AppComponent, JoinRoom, Dashboard, LoginComponent, Ground, FocusGame, SortPipe, UnoGame, ChatRoom],
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig), ToastModule.forRoot(options)],
  providers: [AuthGuard, HttpServices, Config],
  bootstrap: [AppComponent]
})
export class AppModule {

}
