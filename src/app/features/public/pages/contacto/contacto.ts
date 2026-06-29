import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contact {
  contactOptions = [
    { title: 'Soporte para postulantes', detail: 'Atención rápida para dudas sobre procesos y aplicaciones.' },
    { title: 'Empresas', detail: 'Ayudamos a publicar vacantes y gestionar procesos de selección.' },
    { title: 'Prensa', detail: 'Información para medios, alianzas y colaboraciones institucionales.' }
  ];
}
