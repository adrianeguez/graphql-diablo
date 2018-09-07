import { RolInterface } from "rol/interfaces/rol.interface";

export interface UsuarioInterface {
    id?: number;
    nombre: string;
    casado: boolean;
    edad: number;
    sueldo: number;
    rolId: RolInterface | number;
    fechaNacimiento: Date;
}

export interface UsuarioCrearDtoInterface {
    usuario: UsuarioInterface;
}