import {Routes} from '@angular/router';
import {JoinRoom} from './joinroom/joinroom';
import {Sample} from './joinroom/sample/sample';
import {SampleOne} from './joinroom/sample1/sample1';
import {LoginComponent} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import { AuthGuard } from './app.authguard';

export const rootRouterConfig: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Dashboard },
  {
    path: 'join', component: JoinRoom, canActivate: [AuthGuard],
    children: [
      { path: 'sample', component: Sample },
      { path: 'sample1', component: SampleOne },
      { path: '', component: Sample }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

