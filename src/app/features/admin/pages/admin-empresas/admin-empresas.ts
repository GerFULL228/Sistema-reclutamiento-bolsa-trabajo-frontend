import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AdminEmpresaService } from '../../services/admin-empresa';
import { Empresa, EstadoValidacion } from '../../models/Empresa';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-admin-empresas',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './admin-empresas.html',
  styleUrl: './admin-empresas.scss'
})
export class AdminEmpresas implements OnInit {

  private adminEmpresaService = inject(AdminEmpresaService);
  private messageService = inject(MessageServices);
  private confirmationService = inject(ConfirmationService);

  loading = signal<boolean>(true);
  empresas = signal<Empresa[]>([]);

  busqueda = signal<string>('');
  estadoFiltro = signal<EstadoValidacion | null>(null);

  estadosOptions = [
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Activo', value: 'ACTIVO' },
    { label: 'Rechazado', value: 'RECHAZADO' },
  ];

  empresasFiltradas = computed(() => {
    const texto = this.busqueda().toLowerCase().trim();
    const estado = this.estadoFiltro();

    return this.empresas().filter(e => {
      const coincideTexto = !texto ||
        e.nombreEmpresa.toLowerCase().includes(texto) ||
        e.ruc.toLowerCase().includes(texto) ||
        e.usuarioEmail.toLowerCase().includes(texto);

      const coincideEstado = !estado || e.estadoValidacion === estado;

      return coincideTexto && coincideEstado;
    });
  });

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.loading.set(true);
    this.adminEmpresaService.listar().subscribe({
      next: (empresas) => {
        this.empresas.set(empresas);
        this.loading.set(false);
      },
      error: () => {
        this.messageService.showError('No se pudo cargar la lista de empresas.');
        this.loading.set(false);
      }
    });
  }

  severidadEstado(estado: EstadoValidacion): 'success' | 'warn' | 'danger' {
    if (estado === 'ACTIVO') return 'success';
    if (estado === 'PENDIENTE') return 'warn';
    return 'danger';
  }

  confirmarEliminar(empresa: Empresa): void {
    this.confirmationService.confirm({
      header: 'Eliminar empresa',
      message: `¿Seguro que deseas eliminar a "${empresa.nombreEmpresa}"? Esta acción no se puede deshacer.`,
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      accept: () => this.eliminarEmpresa(empresa)
    });
  }

  private eliminarEmpresa(empresa: Empresa): void {
    this.adminEmpresaService.eliminar(empresa.id).subscribe({
      next: () => {
        this.messageService.showSuccess('Empresa eliminada correctamente.');
        this.empresas.update(lista => lista.filter(e => e.id !== empresa.id));
      },
      error: () => this.messageService.showError('No se pudo eliminar la empresa.')
    });
  }
}
