import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path: '',
        loadChildren: () => import('../app/layout/public-layout/public-layout.route').then(p=>p.PUBLIC_LAYOUT_ROUTE)
    },

    {
        path: 'auth/login',
        loadComponent: () => import('../app/features/auth/pages/login/login').then(p=>p.Login)
    },
    {
        path: 'auth/register',
        loadComponent: () => import('../app/features/auth/pages/register/register').then(p=>p.Register)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('../app/layout/dashboard-layout/public-layout.route').then(p=>p.PUBLIC_LAYOUT_ROUTE)
    }
    
    
];
