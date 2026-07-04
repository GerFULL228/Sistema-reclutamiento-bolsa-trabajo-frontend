import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminEmpresaService } from '../../services/admin-empresa';
import { AdminOfertaService } from '../../services/admin-oferta';
import { Empresa } from '../../models/Empresa';
import { Oferta } from '../../models/Oferta';
import { MessageServices } from '../../../../core/services/messages/message-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {

  private adminEmpresaService = inject(AdminEmpresaService);
  private adminOfertaService = inject(AdminOfertaService);
  private messageService = inject(MessageServices);

  loading = signal<boolean>(true);

  empresas = signal<Empresa[]>([]);
  ofertasRecientes = signal<Oferta[]>([]);
  totalOfertas = signal<number>(0);

  stats = signal({
    totalEmpresas: 0,
    empresasPendientes: 0,
    empresasActivas: 0,
    totalOfertas: 0
  });

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading.set(true);

    this.adminEmpresaService.listar().subscribe({
      next: (empresas) => {
        this.empresas.set(empresas);

        this.stats.update(s => ({
          ...s,
          totalEmpresas: empresas.length,
          empresasPendientes: empresas.filter(e => e.estadoValidacion === 'PENDIENTE').length,
          empresasActivas: empresas.filter(e => e.estadoValidacion === 'ACTIVO').length,
        }));
      },
      error: () => this.messageService.showError('No se pudo cargar la lista de empresas.')
    });

    this.adminOfertaService.listar(0, 5).subscribe({
      next: (page) => {
        this.ofertasRecientes.set(page.content);
        this.stats.update(s => ({ ...s, totalOfertas: page.totalElements }));
        this.loading.set(false);
      },
      error: () => {
        this.messageService.showError('No se pudo cargar la lista de ofertas.');
        this.loading.set(false);
      }
    });
  }
}
