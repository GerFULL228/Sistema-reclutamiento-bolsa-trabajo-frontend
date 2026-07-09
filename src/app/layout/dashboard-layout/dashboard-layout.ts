import { Component } from '@angular/core';
import { Router,  RouterOutlet } from '@angular/router';
import { Sidebar } from "../../shared/components/ui/sidebar/sidebar";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    
    RouterOutlet,
    Sidebar
],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss'
})
export class DashboardLayout {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear(); 
    this.router.navigateByUrl('/home');
  }
}