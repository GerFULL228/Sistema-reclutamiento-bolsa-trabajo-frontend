import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environmment.develop';
import { Oferta } from '../models/Oferta';
import { PageResponse } from '../models/PageResponse';

@Injectable({
  providedIn: 'root',
})
export class AdminOfertaService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/admin/ofertas`;

  listar(page: number = 0, size: number = 5): Observable<PageResponse<Oferta>> {
    return this.http.get<PageResponse<Oferta>>(this.apiUrl, {
      params: { page, size }
    });
  }

  obtenerPorId(id: number): Observable<Oferta> {
    return this.http.get<Oferta>(`${this.apiUrl}/${id}`);
  }
}
