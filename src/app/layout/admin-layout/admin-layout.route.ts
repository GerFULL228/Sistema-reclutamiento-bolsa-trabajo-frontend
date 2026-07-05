import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout';

export const ADMIN_LAYOUT_ROUTE: Routes = [

  {
    path: '',
    component: AdminLayout,

    children: [

      {
        path: '',
        loadComponent: () =>
          import('../../features/admin/pages/admin-dashboard/admin-dashboard')
            .then(c => c.AdminDashboard)
      },

      {
        path: 'empresas',
        loadComponent: () =>
          import('../../features/admin/pages/admin-empresas/admin-empresas')
            .then(c => c.AdminEmpresas)
      },

      {
        path: 'empresas/nueva',
        loadComponent: () =>
          import('../../features/admin/pages/admin-empresa-nueva/admin-empresa-nueva')
            .then(c => c.AdminEmpresaNueva)
      },

      {
        path: 'empresas/:id',
        loadComponent: () =>
          import('../../features/admin/pages/admin-empresa-detalle/admin-empresa-detalle')
            .then(c => c.AdminEmpresaDetalle)
      },

      {
        path: 'ofertas',
        loadComponent: () =>
          import('../../features/admin/pages/admin-ofertas/admin-ofertas')
            .then(c => c.AdminOfertas)
      },

      {
        path: 'ofertas/:id',
        loadComponent: () =>
          import('../../features/admin/pages/admin-oferta-detalle/admin-oferta-detalle')
            .then(c => c.AdminOfertaDetalle)
      },

      {
        path: 'cv',
        loadComponent: () =>
          import('../../features/admin/pages/admin-cv/admin-cv')
            .then(c => c.AdminCv)
      },

      {
        path: 'cv/:id',
        loadComponent: () =>
          import('../../features/admin/pages/admin-cv-detalle/admin-cv-detalle')
            .then(c => c.AdminCvDetalle)
      }

    ]
  }

];