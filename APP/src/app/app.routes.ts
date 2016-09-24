import {Routes} from '@angular/router';
import {JoinRoom} from './joinroom/joinroom';
import {Ground} from './ground/ground';
import {LoginComponent} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import { AuthGuard } from './app.authguard';

export const rootRouterConfig: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Dashboard },
  {
    path: 'join', component: JoinRoom, canActivate: [AuthGuard]
  },
  {
    path: 'gameground', component: Ground, canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

