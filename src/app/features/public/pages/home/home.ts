import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule, 
    InputIconModule, 
    InputTextModule,
    FormsModule, 
    Button,
    ChipModule,
    BadgeModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchPosition: string = '';
  searchLocation: string = '';
  loading: boolean = false;

  // Datos de ejemplo (sin conexión real al backend)
  stats = {
    totalJobs: 18500,
    registeredCompanies: 2400,
    activeApplicants: 95000,
    satisfactionRate: 94
  };

  featuredJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp S.A.',
      location: 'Lima, PE',
      salary: 'S/ 8,000 - 12,000',
      modality: 'Remoto',
      icon: 'pi pi-briefcase'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovatePe',
      location: 'Lima, PE',
      salary: 'S/ 10,000 - 15,000',
      modality: 'Híbrido',
      icon: 'pi pi-briefcase'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'Arequipa, PE',
      salary: 'S/ 7,000 - 11,000',
      modality: 'Presencial',
      icon: 'pi pi-briefcase'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      company: 'Creative Studio',
      location: 'Lima, PE',
      salary: 'S/ 5,000 - 8,000',
      modality: 'Remoto',
      icon: 'pi pi-briefcase'
    }
  ];

  features = [
    {
      icon: 'pi pi-search',
      title: 'Encuentra empleos',
      description: 'Accede a miles de ofertas laborales actualizadas diariamente. Filtra por sector, modalidad, ubicación y más.'
    },
    {
      icon: 'pi pi-briefcase',
      title: 'Publica oportunidades',
      description: 'Conecta con los mejores talentos del mercado. Gestiona postulaciones y entrevistas en un solo lugar.'
    },
    {
      icon: 'pi pi-chart-bar',
      title: 'Gestiona postulaciones',
      description: 'Haz seguimiento de todas tus postulaciones en tiempo real y mantente informado en cada etapa del proceso.'
    }
  ];

  ngOnInit(): void {
    // Aquí irían las llamadas a los servicios para obtener datos del backend
    // Por ahora solo mostramos datos de ejemplo
  }

  /**
   * Busca empleos por criterios
   * API: POST /api/jobs/search
   * Params: { position: string, location: string }
   * Response: { success: boolean, jobs: Job[], count: number }
   */
  searchJobs(): void {
    if (!this.searchPosition && !this.searchLocation) {
      alert('Por favor ingresa un cargo o ubicación');
      return;
    }

    this.loading = true;

    // TODO: Conectar con backend cuando esté listo
    // const criteria = {
    //   position: this.searchPosition,
    //   location: this.searchLocation
    // };
    // this.jobService.searchJobs(criteria).subscribe(...)

    // Simulación de búsqueda
    setTimeout(() => {
      this.loading = false;
      alert(`Buscando empleos: ${this.searchPosition} en ${this.searchLocation || 'cualquier ubicación'}`);
    }, 1000);
  }

  /**
   * Busca por una etiqueta popular
   * API: POST /api/jobs/search
   * Params: { position: string }
   */
  searchByTag(tag: string): void {
    this.searchPosition = tag;
    this.searchJobs();
  }

  /**
   * Navega a empleos o abre formulario de publicación
   */
  navigateToJobs(): void {
    // this.router.navigate(['/empleos']);
  }

  publishJob(): void {
    // this.router.navigate(['/publish']);
  }

  registerNow(): void {
    // this.router.navigate(['/registro']);
  }
}
