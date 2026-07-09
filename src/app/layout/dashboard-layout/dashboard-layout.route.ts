import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard-layout';

export const DASHBOARD_LAYOUT_ROUTE: Routes = [
  {
    path: '',
    component: DashboardLayout,

    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/companies/pages/company-dashboard/company-dashboard')
            .then(c => c.CompanyDashboard)
      },

      {
        path: 'jobs',
        loadChildren: () =>
          import('../../features/ofertas/managment/Oferta.managment.route')
            .then(c => c.OFERTAS_MANAGMENT_ROUTE)
      },

      
    ]
  }
];