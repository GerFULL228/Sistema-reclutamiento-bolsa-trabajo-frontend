import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las estadísticas de la plataforma
   */
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  /**
   * Busca empleos por criterios
   * @param criteria Objeto con cargo, ubicación u otros filtros
   */
  searchJobs(criteria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs/search`, criteria);
  }

  /**
   * Obtiene empleos nuevos de esta semana
   */
  getNewJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/new-this-week`);
  }

  /**
   * Obtiene búsquedas populares
   */
  getPopularSearches(): Observable<any> {
    return this.http.get(`${this.apiUrl}/searches/popular`);
  }
}
