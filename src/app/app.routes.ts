import { Routes } from '@angular/router';
import { CalendarComponent } from './dashboard/pages/calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { Step02Component } from './auth/pages/register/pages/step02/step02.component';
import { Step03Component } from './auth/pages/register/pages/step03/step03.component';
import { GraphicComponent } from './dashboard/pages/graphic/graphic.component';
import { TopicsComponent } from './dashboard/pages/topics/topics.component';
import { InfoComponent } from './dashboard/pages/info/info.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './dashboard/pages/todo/todo.component';
import { AddTaskComponent } from './dashboard/pages/todo/pages/add-task/add-task.component';
import { AchievedComponent } from './dashboard/pages/todo/pages/achieved/achieved.component';
import { MapsComponent } from './dashboard/pages/maps/maps.component';
import { TodoMapsComponent } from './dashboard/pages/todo/pages/todo-maps/todo-maps.component';
import { TodoTodayComponent } from './dashboard/pages/todo/pages/todo-today/todo-today.component';
import { TodoHomeComponent } from './dashboard/pages/todo/pages/todo-home/todo-home.component';
import { ProfileComponent } from './dashboard/auth/profile/profile.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, children: [
    {path: 'step2', component: Step02Component},
    {path: 'step3', component: Step03Component},
  ]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'settings', component: ProfileComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'todo', component: TodoComponent, children: [
      {path: 'home-todo', component: TodoHomeComponent},
      {path: 'add-task', component: AddTaskComponent},
      {path: 'achieved', component: AchievedComponent},
      {path: 'maps-todo', component: TodoMapsComponent},
      {path: 'today-todo', component: TodoTodayComponent}
    ]},
    {path: 'maps', component: MapsComponent},
    {path: 'graphic', component: GraphicComponent},
    {path: 'topics', component: TopicsComponent},
    {path: 'info', component: InfoComponent},
  ]},
  {path: '**', redirectTo: ''}
];
