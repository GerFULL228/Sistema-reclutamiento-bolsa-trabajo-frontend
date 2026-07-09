import { Component, Input } from '@angular/core';
import { OfertaResponse } from '../../data-access/oferta.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-oferta-card',
  imports: [RouterLink],
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
