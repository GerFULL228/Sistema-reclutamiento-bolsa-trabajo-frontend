import { Component, Input } from '@angular/core';
import { OfertaResponse } from '../../data-access/oferta.model';


@Component({
  selector: 'app-oferta-card',
  imports: [],
  templateUrl: './oferta-card.html',
  styleUrl: './oferta-card.scss',
})
export class OfertaCard {

  @Input() oferta!:OfertaResponse;

}
