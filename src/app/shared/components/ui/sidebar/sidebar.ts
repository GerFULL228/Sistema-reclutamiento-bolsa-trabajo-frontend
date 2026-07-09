import { Component, computed, inject } from '@angular/core';

import { TokenService } from '../../../../core/services/token/token';
import { MENU_ITEMS } from '../../../../core/config/menu.config';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {

  private tokenService = inject(TokenService);
  private router = inject(Router);
  readonly rol = this.tokenService.getRoles();
  private token = computed(() => this.tokenService.getDecodeToken());
  readonly menuItems = computed(() => {

    const roles = this.tokenService.getRoles();



    const items = MENU_ITEMS.filter(item =>
      roles.some(r => item.roles.includes(r))
    );



    return items;
  });

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }
  nombreUsuario = computed(() => {
    const t = this.token();
    return `${t?.nombre ?? ''} ${t?.apellido ?? ''}`.trim() || t?.sub || 'Usuario';
  });

  rolUsuario = computed(() => {
    const t = this.token();
    const roles: string[] = t?.roles || [];
    const rol = roles[0] || '';
   
    return rol.replace('ROLE_', '').charAt(0).toUpperCase() +
      rol.replace('ROLE_', '').slice(1).toLowerCase();
  });

  iniciales = computed(() => {
    const t = this.token();
    const n = t?.nombre?.[0] || '';
    const a = t?.apellido?.[0] || '';
    return (n + a).toUpperCase() || 'US';
  });
}
