export interface OfertaResponse {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    salario: number;
    estado: boolean;
    nombreEmpresa: string;
}


export interface OfertaRequest {
    titulo: string;
    descripcion: string;
    ubicacion: string;
    salario: number;
    estado: boolean;
}