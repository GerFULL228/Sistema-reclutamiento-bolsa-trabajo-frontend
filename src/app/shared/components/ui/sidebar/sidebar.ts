import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../../../core/services/token/token';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss' // Manteniendo tu diseño original intacto
})
export class Sidebar implements OnInit {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  // Variables reactivas (Signals) que tu HTML original espera
  menuItems = signal<any[]>([]);
  nombreUsuario = signal<string>('Usuario');
  rolUsuario = signal<string>('Desconocido');
  iniciales = signal<string>('U');

  ngOnInit(): void {
    // Leemos los datos que guardamos en el login
    const rol = localStorage.getItem('user_role') || 'POSTULANTE'; // Valor por defecto por si acaso
    const nombre = localStorage.getItem('user_name') || 'Juan Perez'; // Nombre temporal si no hay
    
    // Seteamos las variables del UI
    this.rolUsuario.set(rol);
    this.nombreUsuario.set(nombre);
    this.iniciales.set(nombre.charAt(0).toUpperCase());

    // Asignamos el menú respetando tu estructura de rutas
  if (rol.includes('POSTULANTE')) {
  this.menuItems.set([
    { label: 'Buscar Empleos', icon: 'pi pi-briefcase', route: '/dashboard/ofertas' },
    { label: 'Mis Postulaciones', icon: 'pi pi-file-check', route: '/dashboard/postulaciones' },
    { label: 'Mi Perfil / CV', icon: 'pi pi-user-edit', route: '/dashboard/perfil' }
  ]);

  
  } else if (rol.includes('EMPRESA')) {
      this.menuItems.set([
        { label: 'Panel de Control', icon: 'pi pi-chart-bar', route: '/dashboard/empresa' },
        { label: 'Publicar Empleo', icon: 'pi pi-plus-circle', route: '/dashboard/jobs/create' },
        { label: 'Gestionar Ofertas', icon: 'pi pi-list', route: '/dashboard/jobs' },
        { label: 'Configuración de Cuenta', icon: 'pi pi-cog', route: '/dashboard/empresa/perfil' }
      ]);
    } else if (rol.includes('ADMIN')) {
      this.menuItems.set([
        { label: 'Panel Admin', icon: 'pi pi-sliders-h', route: '/dashboard/admin' },
        { label: 'Validar Empresas', icon: 'pi pi-building', route: '/dashboard/admin/empresas' }
      ]);
    }
  }

  logout(): void {
    // Limpia tokens en localStorage y también el signal de permisos en memoria,
    // evitando que queden datos de la sesión anterior si otro usuario inicia sesión después.
    this.tokenService.clearTokens();
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    this.router.navigate(['/auth/login']);
  }
}