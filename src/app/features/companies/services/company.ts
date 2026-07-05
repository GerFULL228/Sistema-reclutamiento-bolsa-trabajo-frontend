import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environmment.develop';
import { CompanyRequest } from '../models/CompanyRequest';
import { CompanyResponse } from '../models/CompanyResponse';

@Injectable({
  providedIn: 'root',
})
export class Company {

  private apiUrl = `${environment.apiUrl}/companies`;
  private http = inject(HttpClient);

  createCompany(data: CompanyRequest): Observable<CompanyResponse> {
    return this.http.post<CompanyResponse>(this.apiUrl, data);
  }

  getMyCompany(): Observable<CompanyResponse> {
    return this.http.get<CompanyResponse>(`${this.apiUrl}/me`);
  }

  updateCompany(id: number, data: CompanyRequest): Observable<CompanyResponse> {
    return this.http.put<CompanyResponse>(`${this.apiUrl}/${id}`, data);
  }
}