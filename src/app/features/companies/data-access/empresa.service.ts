import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaResponse } from './empresa.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/empresas';

  listar(): Observable<EmpresaResponse[]> {
    return this.http.get<EmpresaResponse[]>(this.apiUrl);
  }

}