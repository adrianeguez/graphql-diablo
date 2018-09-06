
import { validate, IsAlpha, IsBoolean, Contains, IsInt, Matches, Length, IsEmail, IsFQDN, IsDate, Min, Max, MinLength, MaxLength, IsOptional, IsDateString } from "class-validator";

export class UniversidadDto {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsAlpha()
    @MinLength(3)
    @MaxLength(50)
    nombre: string;

    @IsDateString()
    fechaCreacion: Date;

    @IsInt()
    @Min(1)
    numeroFacultades: number;

    @IsBoolean()
    acreditada: boolean;
}
export interface UInterface{
    id?: number;
    nombre: string;
    fechaCreacion: Date;
    numeroFacultades: number;
    acreditada: boolean;
}