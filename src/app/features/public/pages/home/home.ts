import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { HomeService } from './home.service';

interface JobOffer {
  id: number | string;
  title: string;
  company: string;
  location: string;
  salary: string;
  modality: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ChipModule,
    BadgeModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [HomeService]
})
export class Home implements OnInit {
  searchPosition = '';
  searchLocation = '';
  loading = false;

  stats = {
    totalJobs: 18500,
    registeredCompanies: 2400,
    activeApplicants: 95000,
    satisfactionRate: 94
  };

  searchTags = ['Marketing', 'UX/UI', 'TI', 'Ventas', 'Administración'];

  featuredJobs: JobOffer[] = [
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

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadFeaturedOffers();
  }

  loadFeaturedOffers(): void {
    this.homeService.getFeaturedOffers().subscribe({
      next: (offers) => {
        if (offers.length) {
          this.featuredJobs = offers.slice(0, 4);
        }
      },
      error: () => {
        // Mantener datos demo si el backend no responde
      }
    });
  }

  searchJobs(): void {
    if (!this.searchPosition.trim() && !this.searchLocation.trim()) {
      alert('Por favor ingresa un cargo o ubicación');
      return;
    }

    this.loading = true;

    const criteria = {
      position: this.searchPosition.trim(),
      location: this.searchLocation.trim()
    };

    this.homeService.searchOffers(criteria).subscribe({
      next: (offers) => {
        this.loading = false;
        if (offers.length) {
          this.featuredJobs = offers.slice(0, 4);
        } else {
          alert('No se encontraron ofertas con esos filtros');
        }
      },
      error: () => {
        this.loading = false;
        alert('No se pudo conectar con el backend en este momento');
      }
    });
  }

  searchByTag(tag: string): void {
    this.searchPosition = tag;
    this.searchJobs();
  }

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
