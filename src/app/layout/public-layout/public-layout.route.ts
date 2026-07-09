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
            loadComponent : () => import('../../features/ofertas/catalogo/pages/oferta-list/oferta-list').then(p=>p.OfertaList)
          },
          {
            path: 'empleos/:id',
            loadComponent : () => import('../../features/ofertas/catalogo/pages/oferta-detail/oferta-detail').then(p=>p.OfertaDetailPage)
          },
          {
            path: 'empresas',
            loadComponent : () => import('../../features/companies/catalogo/pages/empresa-list/empresa-list').then(p=>p.EmpresaList)
          },
          {
            path: 'contacto',
            loadComponent : () => import('../../features/public/pages/contacto/contacto').then(p=>p.Contacto)
          }
        ]
    }

]