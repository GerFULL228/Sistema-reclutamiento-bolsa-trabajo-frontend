import { Routes } from '@angular/router';
import { CompanyProfile } from './features/companies/pages/company-profile/company-profile';
import { EditCompany } from './features/companies/pages/edit-company/edit-company';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'company-profile',
    pathMatch: 'full'
  },
  {
    path: 'company-profile',
    component: CompanyProfile
  },
  {
    path: 'edit-company',
    component: EditCompany
  }
];