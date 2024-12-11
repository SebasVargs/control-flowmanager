import { Routes } from '@angular/router';
import { CalendarComponent } from './dashboard/pages/calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { Step02Component } from './auth/pages/register/pages/step02/step02.component';
import { Step03Component } from './auth/pages/register/pages/step03/step03.component';

export const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, children: [
    {path: 'step2', component: Step02Component},
    {path: 'step3', component: Step03Component},
  ]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'calendar', component: CalendarComponent},
  ]},
  {path: '**', redirectTo: ''}
];
