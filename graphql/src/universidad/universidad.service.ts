import { Injectable } from "@nestjs/common";
import { UniversidadDto } from "./dto/universidad.dto";


@Injectable()
export class UniversidadService {
    private recnum = 1;
    private readonly universidades: UniversidadDto[] = [
        {
            id: 1,
            nombre: 'Sistemas',
            fechaCreacion: new Date(),
            numeroFacultades: 1,
            acreditada: true
        }
    ]

    buscarTodos(): UniversidadDto[] {
        return this.universidades;
    }

    buscarPorId(id: number | string): UniversidadDto {
        return this.universidades.find(universidad => universidad.id == id);
    }

    crearUniversidad(nuevaUniversidad: UniversidadDto): UniversidadDto {
        console.log('servicio')
        this.recnum += 1;
        nuevaUniversidad.id = this.recnum;
        this.universidades.push(nuevaUniversidad);
        return nuevaUniversidad;
    }

}