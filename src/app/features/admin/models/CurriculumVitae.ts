export interface CurriculumVitae {
    id: number;
    tituloProfesional: string;
    descripcion: string;
    experiencia: string;
    habilidades: string;
    educacion: string;
    telefono: string;
    linkedin: string;
    nombreUsuario: string;
    usuarioId: number;
}

export interface CurriculumVitaeRequest {
    tituloProfesional: string;
    descripcion?: string;
    experiencia?: string;
    habilidades?: string;
    educacion?: string;
    telefono?: string;
    linkedin?: string;
    usuarioId: number;
}