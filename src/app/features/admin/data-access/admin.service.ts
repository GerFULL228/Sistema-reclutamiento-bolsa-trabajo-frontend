import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { PageResponse } from '../../../shared/models/page.response';
import { MensajeContacto, UsuarioAdmin } from './admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private http = inject(HttpClient);
  private api = environment.apiUrl;

  listarUsuarios(page = 0, size = 50) {
    return this.http.get<PageResponse<UsuarioAdmin>>(`${this.api}/admin/usuarios`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  cambiarEstadoUsuario(id: number, activo: boolean) {
    return this.http.patch<UsuarioAdmin>(`${this.api}/admin/usuarios/${id}/estado`, { activo });
  }

  listarMensajes(page = 0, size = 50) {
    return this.http.get<PageResponse<MensajeContacto>>(`${this.api}/admin/mensajes-contacto`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }
}
