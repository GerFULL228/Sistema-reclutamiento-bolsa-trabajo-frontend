import { Routes } from '@angular/router';
import { CompanyProfile } from './features/companies/pages/company-profile/company-profile';
import { EditCompany } from './features/companies/pages/edit-company/edit-company';

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
    path: 'auth/register/empresa',
    loadComponent: () =>
      import('./features/companies/pages/company-profile/company-profile').then(
        (p) => p.CompanyProfile
      ),
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
    loadChildren: () =>
      import('./layout/dashboard-layout/dashboard-layout.route').then(
        (p) => p.DASHBOARD_LAYOUT_ROUTE
      ),
  },

  // Tus páginas
  {
    path: 'company-profile',
    component: CompanyProfile,
  },
  {
    path: 'edit-company',
    component: EditCompany,
  },
];
