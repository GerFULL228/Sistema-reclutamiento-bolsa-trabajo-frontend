export interface OfertaResponse {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    salario: number;
    estado: string;
    nombreEmpresa: string;
}

export interface OfertaRequest {
    titulo: string;
    descripcion: string;
    ubicacion: string;
    salario: number;
}

// Update parcial: el backend acepta cualquier subconjunto de estos campos (PATCH).
export interface OfertaUpdateRequest {
    titulo?: string;
    descripcion?: string;
    ubicacion?: string;
    salario?: number;
    estado?: string;
}

export interface EmpresaOfertaStats {
    totalOfertas: number;
    activas: number;
    cerradas: number;
}
