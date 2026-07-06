import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss', 
})
export class Home implements OnInit {
  
  
  private router = inject(Router);

  // Variables para el buscador
  searchPosition: string = '';
  searchLocation: string = '';
  loading: boolean = false;
  searchTags: string[] = ['Remoto', 'Desarrollo', 'Diseño', 'Marketing'];

  // Variables para la sección de Stats 
  stats = {
    registeredCompanies: 150,
    totalJobs: 1200,
    activeApplicants: 5000
  };

  // Variables para la sección de Features
  features = [
    { icon: 'pi pi-search', title: 'Búsqueda inteligente', description: 'Encuentra ofertas que se ajustan a tu perfil' },
    { icon: 'pi pi-bolt', title: 'Postulación rápida', description: 'Aplica a trabajos con un solo clic' },
    { icon: 'pi pi-chart-line', title: 'Seguimiento', description: 'Monitorea el estado de tus postulaciones' }
  ];

  // Array que guardará los datos reales del backend
  featuredJobs: any[] = [];

  ngOnInit() {
    this.cargarOfertasDestacadas();
  }

  cargarOfertasDestacadas() {
   
  }

  searchJobs() {
    
  }

  searchByTag(tag: string) {
    this.searchPosition = tag;
    this.searchJobs();
  }

  navigateToJobs() {
    this.router.navigate(['/empleos']); // Cambia la ruta según como la tengas
  }

  registerNow() {
    this.router.navigate(['/auth/register']);
  }
}