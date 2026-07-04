export type EstadoValidacion = 'PENDIENTE' | 'ACTIVO' | 'RECHAZADO';

export interface Empresa {
  id: number;
  nombreEmpresa: string;
  razonSocial: string;
  ruc: string;
  estadoValidacion: EstadoValidacion;
  usuarioEmail: string;
}

// Se usa para el formulario de edición (PUT /api/empresas/{id})
export interface EmpresaRequest {
  nombreEmpresa: string;
  ruc: string;
  descripcion?: string;
  direccion?: string;
  razonSocial: string;
  paginaWeb?: string;
  usuario: {
    email: string;
    password?: string;
  };
}
