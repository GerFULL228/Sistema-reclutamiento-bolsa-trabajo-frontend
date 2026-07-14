export interface UsuarioAdmin {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  nombreEmpresa?: string | null;
  activo: boolean;
  fechaCreacion: string;
}

export interface MensajeContacto {
  id: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  fechaEnvio: string;
}
