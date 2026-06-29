import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CompanyHighlight {
  name: string;
  sector: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empresas.html',
  styleUrl: './empresas.css'
})
export class Companies {
  featuredCompanies: CompanyHighlight[] = [
    {
      name: 'TechCorp S.A.',
      sector: 'Tecnología',
      location: 'Lima',
      description: 'Impulsa productos digitales y transforma procesos de negocio con equipos ágiles.'
    },
    {
      name: 'GreenWork',
      sector: 'Sostenibilidad',
      location: 'Trujillo',
      description: 'Desarrolla soluciones de impacto para negocios con enfoque ambiental y social.'
    },
    {
      name: 'NovaLabs',
      sector: 'Innovación',
      location: 'Cusco',
      description: 'Acelera la adopción de tecnología y talento especializado en proyectos disruptivos.'
    }
  ];
}
