import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

// 1. Import your actual, feature-rich component file here:
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 2. This path will now cleanly resolve to your complete layout file
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
