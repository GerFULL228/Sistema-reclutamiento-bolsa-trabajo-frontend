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
          }


        ]
    }

]