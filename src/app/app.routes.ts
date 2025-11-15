
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { DashboardUserComponent } from './user-role/dashboard/dashboard-user';
import { DashboardAdminComponent } from './admin-role/dashboard/dashboard-admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'user/dashboard',
    component: DashboardUserComponent,
    canActivate: [authGuard],
    data: { role: 'User' }
  },
  {
    path: 'admin/dashboard',
    component: DashboardAdminComponent,
    canActivate: [authGuard],
    data: { role: 'Admin' }
  },
  { path: '**', redirectTo: '/auth/login' }
];
