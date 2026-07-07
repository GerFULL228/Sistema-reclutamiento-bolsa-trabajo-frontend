import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { CurriculumVitae, CurriculumVitaeRequest } from '../models/CurriculumVitae';

@Injectable({
    providedIn: 'root',
})
export class AdminCvService {

    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/cv`;

    listar(): Observable<CurriculumVitae[]> {
        return this.http.get<CurriculumVitae[]>(this.apiUrl);
    }

    obtenerPorId(id: number): Observable<CurriculumVitae> {
        return this.http.get<CurriculumVitae>(`${this.apiUrl}/${id}`);
    }

    actualizar(id: number, data: CurriculumVitaeRequest): Observable<CurriculumVitae> {
        return this.http.put<CurriculumVitae>(`${this.apiUrl}/${id}`, data);
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}