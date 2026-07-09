import { Component, inject, Input } from '@angular/core';
import { OfertaResponse } from '../../../data-access/oferta.model';

import { OfertaFacade } from '../../../data-access/oferta.facade';
import { ActivatedRoute } from '@angular/router';
import { OfertaDetail } from '../../../ui/oferta-detail/oferta-detail';

@Component({
  selector: 'app-oferta-detail-page',
  imports: [OfertaDetail],
  templateUrl: './oferta-detail.html',
  styleUrl: './oferta-detail.scss',
})
export class OfertaDetailPage {
  private route = inject(ActivatedRoute);
  private facade = inject(OfertaFacade);

  oferta = this.facade.ofertaSeleccionada;

  ngOnInit() {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.facade.cargarPorId(id);
  }

  
}
