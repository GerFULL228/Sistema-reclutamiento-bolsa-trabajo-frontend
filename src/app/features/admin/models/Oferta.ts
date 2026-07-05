export type OfertaEstado = 'BORRADOR' | 'ACTIVA' | 'PAUSADA' | 'CERRADA' | 'ELIMINADA';

export interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario: number;
  estado: OfertaEstado;
  nombreEmpresa: string;
}

export interface OfertaUpdateRequest {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario: number;
  estado: OfertaEstado;
}