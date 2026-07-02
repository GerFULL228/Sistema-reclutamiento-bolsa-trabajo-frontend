import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HomeService } from '../home/home.service'; 

@Component({
  selector: 'app-trabajos',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './trabajos.html',
  styleUrl: './trabajos.scss'
})
export class Trabajos implements OnInit {
  private ofertasService = inject(HomeService);

  listaOfertas: any[] = [];
  cargando: boolean = true;
  criterioBusqueda: string = '';

  ngOnInit() {
    this.cargarTodasLasOfertas();
  }

  cargarTodasLasOfertas() {
    this.cargando = true;
    // Traemos 20 ofertas para esta página completa
    this.ofertasService.getFeaturedOffers(0, 20).subscribe({
      next: (data) => {
        this.listaOfertas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  filtrarEmpleos() {
    this.cargando = true;
    this.ofertasService.searchOffers({ position: this.criterioBusqueda }, 0, 20).subscribe({
      next: (data) => {
        this.listaOfertas = data;
        this.cargando = false;
      }
    });
  }
}