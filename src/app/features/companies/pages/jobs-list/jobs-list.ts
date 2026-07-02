import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss'
})
export class JobsList {

  offers = [

    {
      id: 1,
      title: 'Senior Frontend Developer',
      category: 'Tecnología',
      modality: 'Remoto',
      applicants: 47,
      views: 312,
      createdAt: '15 Jun 2026',
      daysLeft: 5,
      status: 'Activa'
    },

    {
      id: 2,
      title: 'UX/UI Designer',
      category: 'Diseño',
      modality: 'Híbrido',
      applicants: 23,
      views: 198,
      createdAt: '12 Jun 2026',
      daysLeft: 10,
      status: 'Activa'
    }

  ];

}