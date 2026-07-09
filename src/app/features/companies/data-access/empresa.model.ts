export interface EmpresaResponse {
  id: number;
  nombreEmpresa: string;
  razonSocial: string;
  ruc: string;
  estadoValidacion: string;
  usuarioEmail: string;
}

export interface EmpresaRequest {

    nombre: string;
    ruc: string;
    correoCorporativo: string;
    telefono: string;
    direccion: string;
    descripcion: string;
    
}