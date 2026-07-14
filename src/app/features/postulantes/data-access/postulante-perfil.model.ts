export interface PostulantePerfil {
  postulanteId: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento?: string | null;
  genero?: string | null;
  direccion?: string | null;
  tituloProfesional?: string | null;
  descripcion?: string | null;
  experiencia?: string | null;
  habilidades?: string | null;
  educacion?: string | null;
  telefono?: string | null;
  linkedin?: string | null;
}

export interface PostulantePerfilUpdate {
  nombre: string;
  apellido: string;
  fechaNacimiento?: string | null;
  genero?: string | null;
  direccion?: string | null;
  tituloProfesional?: string | null;
  descripcion?: string | null;
  experiencia?: string | null;
  habilidades?: string | null;
  educacion?: string | null;
  telefono?: string | null;
  linkedin?: string | null;
}
