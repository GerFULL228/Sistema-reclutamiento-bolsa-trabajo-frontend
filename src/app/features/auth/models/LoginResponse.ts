
export interface LoginResponse{
    accessToken:string;
    resfreshToken:string;
    tokenType:string;
    expiresIn: number;
    email: string;
    rol: string;
    permisos: string[];
}