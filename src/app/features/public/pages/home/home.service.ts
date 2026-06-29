import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly baseUrl = 'http://localhost:8080/api';
  
  
  private http = inject(HttpClient); 

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /**
   * Login de usuario.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials, { headers: this.getAuthHeaders() });
  }

  /**
   * Registro de postulante.
   */
  registerPostulante(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/postulante/register`, payload, { headers: this.getAuthHeaders() });
  }

  /**
   * Obtiene ofertas públicas.
   */
  getFeaturedOffers(page: number = 0, size: number = 5): Observable<any[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/ofertas/public`, { headers: this.getAuthHeaders(), params }).pipe(
      map((response) => this.normalizeOffers(response)),
      catchError(() => of([]))
    );
  }

  /**
   * Busca ofertas usando el endpoint público.
   */
  searchOffers(criteria: { position?: string; location?: string }, page: number = 0, size: number = 5): Observable<any[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (criteria.position) {
      params = params.set('titulo', criteria.position);
    }
    if (criteria.location) {
      params = params.set('ubicacion', criteria.location);
    }

    return this.http.get<any>(`${this.baseUrl}/ofertas/public`, { headers: this.getAuthHeaders(), params }).pipe(
      map((response) => this.normalizeOffers(response)),
      catchError(() => of([]))
    );
  }

  private normalizeOffers(response: any): any[] {
    const items =
      Array.isArray(response) ? response :
      Array.isArray(response?.content) ? response.content :
      Array.isArray(response?.data) ? response.data :
      Array.isArray(response?.items) ? response.items :
      [];

    return items.map((offer: any, index: number) => ({
      id: offer.id ?? offer.codigo ?? index + 1,
      title: offer.titulo ?? offer.nombre ?? offer.title ?? 'Oferta laboral',
      company: offer.nombreEmpresa ?? offer.companyName ?? offer.empresa ?? 'Empresa',
      location: offer.ubicacion ?? offer.location ?? 'Remoto',
      salary: offer.sueldo ?? offer.salary ?? 'A convenir',
      modality: offer.modalidad ?? offer.modality ?? 'Remoto',
      icon: 'pi pi-briefcase'
    }));
  }
}