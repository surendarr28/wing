import {Routes} from '@angular/router';
import {JoinRoom} from './joinroom/joinroom';
import {Sample} from './joinroom/sample/sample';
import {SampleOne} from './joinroom/sample1/sample1';
import {LoginComponent} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import { AuthGuard } from './app.authguard';

export const rootRouterConfig: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Dashboard, canActivate: [AuthGuard], },
  {
    path: 'about', component: JoinRoom, canActivate: [AuthGuard],
    children: [
      { path: 'sample', component: Sample, canActivate: [AuthGuard], },
      { path: 'sample1', component: SampleOne, canActivate: [AuthGuard], },
      { path: '', component: Sample, canActivate: [AuthGuard], }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

