import { Component } from '@angular/core';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  templateUrl: './company-dashboard.html',
  styleUrl: './company-dashboard.scss'
})
export class CompanyDashboard {

  stats = {
    jobs: 3,
    applicants: 101,
    interviews: 8,
    hires: 5
  };

}