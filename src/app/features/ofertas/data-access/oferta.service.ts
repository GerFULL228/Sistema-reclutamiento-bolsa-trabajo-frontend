import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { OfertaRequest, OfertaResponse } from "./oferta.model";
import { environment } from '../../../environment/environment';
import { PageResponse } from "../../../shared/models/page.response";




@Injectable({
   providedIn: 'root'
})

export class OfertaService {

    private http = inject(HttpClient);
    private api = environment.apiUrl ;


    listarPublicas() {
    return this.http.get<PageResponse<OfertaResponse>>(`${this.api}/ofertas`);
  }

  listarEmpresa() {
    return this.http.get<PageResponse<OfertaResponse>>(`${this.api}/empresa/ofertas`);
  }

  listarAdmin() {
    return this.http.get<PageResponse<OfertaResponse>>(`${this.api}/admin/ofertas`);
  }

  crear(request: OfertaRequest) {
    return this.http.post(`${this.api}/ofertas`, request);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/ofertas/${id}`);
  }
}