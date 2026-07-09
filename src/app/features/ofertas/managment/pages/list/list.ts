import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { OfertaFacade } from '../../../data-access/oferta.facade';
import { signal } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    SkeletonModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {

  private facade = inject(OfertaFacade);

  readonly ofertas = this.facade.ofertas;
  readonly loading = this.facade.loading;

  searchValue = signal('');

  ofertasFiltradas = computed(() => {
    const q = this.searchValue().toLowerCase();
    if (!q) return this.ofertas();
    return this.ofertas().filter(o =>
      o.titulo?.toLowerCase().includes(q) ||
      o.nombreEmpresa?.toLowerCase().includes(q) ||
      o.ubicacion?.toLowerCase().includes(q)
    );
  });

  totalActivas = computed(() => this.ofertas().filter(o => o.estado).length);
  totalCerradas = computed(() => this.ofertas().filter(o => !o.estado).length);

  ngOnInit(): void {
    this.facade.cargarOfertas();
  }

  onSearch(event: Event) {
    this.searchValue.set((event.target as HTMLInputElement).value);
  }

  getSeverity(estado: boolean): 'success' | 'danger' {
    return estado ? 'success' : 'danger';
  }
}