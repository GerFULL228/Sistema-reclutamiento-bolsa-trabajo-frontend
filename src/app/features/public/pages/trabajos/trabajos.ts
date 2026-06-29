import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface JobOffer {
  title: string;
  company: string;
  location: string;
  salary: string;
  modality: string;
  type: string;
}

@Component({
  selector: 'app-trabajos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trabajos.html',
  styleUrl: './trabajos.css'
})
export class Jobs {
  heroStats = [
    { value: '1,200+', label: 'Vacantes activas' },
    { value: '24h', label: 'Respuesta promedio' },
    { value: '94%', label: 'Satisfacción' }
  ];

  featuredJobs: JobOffer[] = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp S.A.',
      location: 'Lima, Perú',
      salary: 'S/ 8,000 - 12,000',
      modality: 'Remoto',
      type: 'Tiempo completo'
    },
    {
      title: 'Analista de Datos',
      company: 'DataFlow',
      location: 'Arequipa, Perú',
      salary: 'S/ 5,500 - 7,500',
      modality: 'Híbrido',
      type: 'Tiempo completo'
    },
    {
      title: 'Especialista UX/UI',
      company: 'Creative Studio',
      location: 'Lima, Perú',
      salary: 'S/ 4,500 - 6,500',
      modality: 'Presencial',
      type: 'Contrato'
    }
  ];
}
