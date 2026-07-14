import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OfertaStore } from '../../../data-access/oferta.store';
import { OfertaCard } from '../../../ui/oferta-card/oferta-card';

@Component({
  selector: 'app-oferta-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, OfertaCard],
  templateUrl: './oferta-list.html',
  styleUrl: './oferta-list.scss'
})
export class OfertaList implements OnInit {
  // Inyectamos nuestro poderoso Store
  private ofertaStore = inject(OfertaStore);

  // Mapeamos los Signals EXACTAMENTE como tu HTML los pide
  ofertas = this.ofertaStore.ofertas;
  loading = this.ofertaStore.loading;

  // Fase 2: buscador básico por título de la oferta o nombre de la empresa
  criterioBusqueda = signal('');

  ofertasFiltradas = computed(() => {
    const criterio = this.criterioBusqueda().trim().toLowerCase();

    if (!criterio) {
      return this.ofertas();
    }

    return this.ofertas().filter(oferta =>
      oferta.titulo?.toLowerCase().includes(criterio) ||
      oferta.nombreEmpresa?.toLowerCase().includes(criterio)
    );
  });

  ngOnInit(): void {
    // Disparamos la carga de las ofertas públicas desde el backend
    this.ofertaStore.loadPublicas();
  }

  filtrarEmpleos(valor: string): void {
    this.criterioBusqueda.set(valor);
  }
}