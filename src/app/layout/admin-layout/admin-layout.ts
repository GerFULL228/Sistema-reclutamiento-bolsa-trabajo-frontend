import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TokenService } from '../../core/services/token/token';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ToastModule
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

  private tokenService = inject(TokenService);
  private router = inject(Router);

  logout(): void {
    this.tokenService.clearTokens();
    this.router.navigateByUrl('/home');
  }
}
