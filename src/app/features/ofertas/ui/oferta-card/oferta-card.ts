import { Component, Input } from '@angular/core';
import { OfertaResponse } from '../../data-access/oferta.model';


@Component({
  selector: 'app-oferta-card',
  imports: [],
  templateUrl: './oferta-card.html',
  styleUrl: './oferta-card.scss',
})
export class OfertaCard {

  @Input() oferta!: OfertaResponse;

  get ofertaempresa(): string[] {
    return this.oferta.nombreEmpresa.trim().split(/\s+/);
  }

  get resultado(): string {
    return this.ofertaempresa[0][0] + this.ofertaempresa[this.ofertaempresa.length - 1][0];
  }

}
