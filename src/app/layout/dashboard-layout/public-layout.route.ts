import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard-layout';

export const PUBLIC_LAYOUT_ROUTE: Routes = [

  {
    path: '',
    component: DashboardLayout,

    children: [

      {
        path: 'company',
        loadComponent: () =>
          import('../../features/companies/pages/company-dashboard/company-dashboard')
          .then(c => c.CompanyDashboard)
      },

      {
        path: 'jobs',
        loadComponent: () =>
          import('../../features/companies/pages/jobs-list/jobs-list')
          .then(c => c.JobsList)
      },

      {
        path: 'company-profile',
        loadComponent: () =>
          import('../../features/companies/pages/company-profile/company-profile')
          .then(c => c.CompanyProfile)
      },

      {
        path: 'edit-company',
        loadComponent: () =>
          import('../../features/companies/pages/edit-company/edit-company')
          .then(c => c.EditCompany)
      },

      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full'
      }

    ]
  }

];