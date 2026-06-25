import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path: '',
        loadChildren: () => import('../app/layout/public-layout/public-layout.route').then(p=>p.PUBLIC_LAYOUT_ROUTE)
    }
];
