import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';
import { rolGuardGuard } from './core/guards/rol-guard-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/public-layout/public-layout.route').then(
        (p) => p.PUBLIC_LAYOUT_ROUTE
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then((p) => p.Login),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/pages/register/register').then((p) => p.Register),
  },
  
  {
    path: 'auth/register/postulante',
    loadComponent: () =>
      import('./features/auth/pages/register/postulante-register/postulante-register').then(
        (p) => p.PostulanteRegister
      ),
  },
  {
    path: 'auth/postulante/edit',
    loadComponent: () =>
      import('./features/auth/pages/register/edit-postulante/edit-postulante').then(
        (p) => p.EditPostulante
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard,rolGuardGuard],
    data: { roles: ['ROLE_EMPRESA', 'ROLE_POSTULANTE', 'ROLE_ADMIN'] },

    loadChildren: () =>
      import('./layout/dashboard-layout/dashboard-layout.route').then(
        (p) => p.DASHBOARD_LAYOUT_ROUTE
      ),
  },

 
  
];
