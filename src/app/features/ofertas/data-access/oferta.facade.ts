import { inject, Injectable } from "@angular/core";
import { OfertaStore } from "./oferta.store";

@Injectable({
  providedIn: 'root'
})
export class OfertaFacade {

  private store = inject(OfertaStore);

  ofertas = this.store.ofertas;
  loading = this.store.loading;
  ofertasDestacadas = this.store.ofertasDestacadas;

  cargarPublicas() {
    this.store.loadPublicas();
  }

  cargarEmpresa() {
    this.store.loadEmpresa();
  }

  cargarAdmin() {
    this.store.loadAdmin();
  }
}