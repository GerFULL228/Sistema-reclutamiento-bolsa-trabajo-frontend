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
    path: 'dashboard',
    loadChildren: () =>
      import('./layout/dashboard-layout/public-layout.route').then(
        (p) => p.PUBLIC_LAYOUT_ROUTE
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