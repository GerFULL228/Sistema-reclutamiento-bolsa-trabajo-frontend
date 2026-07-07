import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { AdminOfertaService } from '../../services/admin-oferta';
import { Oferta, OfertaEstado } from '../../models/Oferta';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-admin-ofertas',
  standalone: true,
  imports: [RouterLink, TableModule, TagModule, InputTextModule, ButtonModule, ConfirmDialogModule, FormsModule],
  providers: [ConfirmationService],
  templateUrl: './admin-ofertas.html',
  styleUrl: './admin-ofertas.scss'
})
export class AdminOfertas implements OnInit {

  private adminOfertaService = inject(AdminOfertaService);
  private messageService = inject(MessageServices);
  private confirmationService = inject(ConfirmationService);

  loading = signal<boolean>(true);
  ofertas = signal<Oferta[]>([]);
  totalRegistros = signal<number>(0);
  filasPorPagina = 5;
  paginaActual = 0;
  busqueda = signal<string>('');

  ngOnInit(): void {
    this.cargarOfertas(0);
  }

  cargarOfertas(page: number): void {
    this.loading.set(true);
    this.paginaActual = page;

    this.adminOfertaService.listar(page, this.filasPorPagina).subscribe({
      next: (res) => {
        this.ofertas.set(res.content);
        this.totalRegistros.set(res.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.showError('No se pudo cargar la lista de ofertas.');
        this.loading.set(false);
      }
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const rows = event.rows ?? this.filasPorPagina;
    const first = event.first ?? 0;
    const page = Math.floor(first / rows);
    this.cargarOfertas(page);
  }

  severidadEstado(estado: OfertaEstado): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (estado) {
      case 'ACTIVA': return 'success';
      case 'PAUSADA': return 'warn';
      case 'CERRADA':
      case 'ELIMINADA': return 'danger';
      default: return 'secondary';
    }
  }

  confirmarEliminar(oferta: Oferta): void {
    this.confirmationService.confirm({
      header: 'Eliminar oferta',
      message: `¿Seguro que deseas eliminar "${oferta.titulo}"? Esta acción no se puede deshacer.`,
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      accept: () => this.eliminarOferta(oferta)
    });
  }

  despues(): void {
    this.messageService.showError('...');
  }

  private eliminarOferta(oferta: Oferta): void {
    this.adminOfertaService.eliminar(oferta.id).subscribe({
      next: () => {
        this.messageService.showSuccess('Oferta eliminada correctamente.');
        this.cargarOfertas(this.paginaActual);
      },
      error: () => this.messageService.showError('No se pudo eliminar la oferta.')
    });
  }
}