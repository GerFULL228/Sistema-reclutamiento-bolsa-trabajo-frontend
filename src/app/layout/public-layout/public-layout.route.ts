import { Routes } from "@angular/router"
import { PublicLayout } from "./public-layout"


export const PUBLIC_LAYOUT_ROUTE:Routes = [

    {path: '' , redirectTo: 'home', pathMatch: 'full'},

    {
        path: '',
        component: PublicLayout,
        children: [
          {
            path: 'home',
            loadComponent : () => import('../../features/public/pages/home/home').then(p=>p.Home)
          },
          {
            path: 'empleos',
            loadComponent : () => import('../../features/public/pages/trabajos/trabajos').then(p=>p.Jobs)
          },
          {
            path: 'empresas',
            loadComponent : () => import('../../features/public/pages/empresas/empresas').then(p=>p.Companies)
          },
          {
            path: 'contacto',
            loadComponent : () => import('../../features/public/pages/contacto/contacto').then(p=>p.Contact)
          }
        ]
    }

]