import {Routes} from '@angular/router';
import {JoinRoom} from './joinroom/joinroom';
import {Dashboard} from './dashboard/dashboard';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Dashboard},
  {path: 'about', component: JoinRoom},
];

