import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PostulantePerfil, PostulantePerfilUpdate } from './postulante-perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PostulantePerfilService {

  private http = inject(HttpClient);
  private api = environment.apiUrl;

  obtenerMiPerfil() {
    return this.http.get<PostulantePerfil>(`${this.api}/postulantes/mi-perfil`);
  }

  actualizarMiPerfil(data: PostulantePerfilUpdate) {
    return this.http.put<PostulantePerfil>(`${this.api}/postulantes/mi-perfil`, data);
  }
}
