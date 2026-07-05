import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environmment.develop';
import { Empresa, EmpresaRequest, EstadoValidacion } from '../models/Empresa';

@Injectable({
  providedIn: 'root',
})
export class AdminEmpresaService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/empresas`;

  listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  actualizar(id: number, data: EmpresaRequest): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/${id}`, data);
  }

  crear(data: EmpresaRequest): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, data);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  actualizarEstado(id: number, estado: EstadoValidacion): Observable<Empresa> {
    return this.http.patch<Empresa>(`${this.apiUrl}/${id}/estado`, { estadoValidacion: estado });
  }
}
