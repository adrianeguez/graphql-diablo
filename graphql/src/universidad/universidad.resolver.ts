import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UniversidadService } from "./universidad.service";
import { ParseIntPipe, UsePipes } from "@nestjs/common";
import { UniversidadDto, UInterface } from "./dto/universidad.dto";
import { UniversidadCreatePipe } from "./universidad.create-pipe";

@Resolver('Universidad')
export class UniversidadResolver {

    constructor(private readonly universidadService: UniversidadService) {

    }

    @Query('obtenerPorId')
    obtenerPorId(
        @Args('id', ParseIntPipe) id: number
    ): UniversidadDto {
        return this.universidadService.buscarPorId(id);
    }

    @Query('traerTodos')
    traerTodos(): UniversidadDto[] {
        return this.universidadService.buscarTodos();
    }

    @Mutation('crearUniversidad')
    @UsePipes(new UniversidadCreatePipe())
    crearUniversidad(
        @Args() universidadDto: UniversidadDto
    ): UniversidadDto {
        return this.universidadService.crearUniversidad(universidadDto);
    }

}