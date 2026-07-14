import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SkeletonModule } from 'primeng/skeleton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToastModule } from 'primeng/toast';

import { AdminService } from '../../data-access/admin.service';
import { UsuarioAdmin } from '../../data-access/admin.model';
import { MessageServices } from '../../../../core/services/messages/message-service';

// Tabla de "Gestión de Usuarios" del panel admin: lista a todos los postulantes
// y empresas registrados, con un switch para habilitar/deshabilitar cada cuenta.
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SkeletonModule,
    ToggleSwitchModule,
    ToastModule,
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {

  private adminService = inject(AdminService);
  private messageService = inject(MessageServices);

  usuarios = signal<UsuarioAdmin[]>([]);
  loading = signal(true);
  cambiandoId = signal<number | null>(null);

  searchValue = signal('');

  usuariosFiltrados = computed(() => {
    const q = this.searchValue().toLowerCase();
    if (!q) return this.usuarios();
    return this.usuarios().filter(u =>
      u.nombre?.toLowerCase().includes(q) ||
      u.apellido?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.nombreEmpresa?.toLowerCase().includes(q)
    );
  });

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading.set(true);
    this.adminService.listarUsuarios(0, 500).subscribe({
      next: (res) => {
        this.usuarios.set(res.content);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.showError('No se pudo cargar la lista de usuarios.');
      }
    });
  }

  onSearch(event: Event) {
    this.searchValue.set((event.target as HTMLInputElement).value);
  }

  getRolLabel(rol: string): string {
    switch (rol) {
      case 'EMPRESA': return 'Empresa';
      case 'POSTULANTE': return 'Postulante';
      default: return rol;
    }
  }

  getRolSeverity(rol: string): 'info' | 'warn' | 'secondary' {
    switch (rol) {
      case 'EMPRESA': return 'info';
      case 'POSTULANTE': return 'warn';
      default: return 'secondary';
    }
  }

  // Se llama al soltar el switch: actualiza el estado en el backend y,
  // solo si la respuesta es exitosa, refleja el cambio en la tabla.
  onToggleEstado(usuario: UsuarioAdmin, nuevoEstado: boolean): void {
    this.cambiandoId.set(usuario.id);

    this.adminService.cambiarEstadoUsuario(usuario.id, nuevoEstado).subscribe({
      next: (actualizado) => {
        this.cambiandoId.set(null);
        this.usuarios.update(lista =>
          lista.map(u => u.id === usuario.id ? { ...u, activo: actualizado.activo } : u)
        );
        this.messageService.showSuccess(
          actualizado.activo
            ? `La cuenta de ${usuario.nombre} fue habilitada correctamente.`
            : `La cuenta de ${usuario.nombre} fue deshabilitada correctamente.`
        );
      },
      error: (err) => {
        this.cambiandoId.set(null);
        const mensaje = err.error?.message || 'No se pudo actualizar el estado de la cuenta.';
        this.messageService.showError(mensaje);
      }
    });
  }
}
