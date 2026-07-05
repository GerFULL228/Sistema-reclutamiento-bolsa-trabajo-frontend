export type EstadoValidacion = 'PENDIENTE' | 'ACTIVO' | 'RECHAZADO';

export interface Empresa {
  id: number;
  nombreEmpresa: string;
  razonSocial: string;
  ruc: string;
  estadoValidacion: EstadoValidacion;
  usuarioEmail: string;
}
export interface EmpresaRequest {
  nombreEmpresa: string;
  ruc: string;
  descripcion?: string;
  direccion?: string;
  razonSocial: string;
  paginaWeb?: string;
  usuario: {
    nombre?: string;
    apellido?: string;
    email: string;
    password?: string;
  };
}