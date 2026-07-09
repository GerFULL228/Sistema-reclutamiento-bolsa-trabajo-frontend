import { Component, inject, OnInit } from '@angular/core';
import { OfertaFacade } from '../../../data-access/oferta.facade';
import { OfertaCard } from '../../../ui/oferta-card/oferta-card';

@Component({
  selector: 'app-oferta-public-list',
  imports: [OfertaCard],
  templateUrl: './oferta-list.html',
  styleUrl: './oferta-list.scss',
})
export class OfertaList implements OnInit {

   facade = inject(OfertaFacade);

  ofertas = this.facade.ofertas;
  loading = this.facade.loading;

  ngOnInit() {
    
    this.facade.cargarOfertas();
    console.log('Ofertas cargadas:', this.ofertas());
    
  }

}
