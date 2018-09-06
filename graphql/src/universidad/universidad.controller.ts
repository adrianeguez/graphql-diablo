import { Controller, Get, Param, Post, Body, UsePipes } from "@nestjs/common";
import { UniversidadService } from "./universidad.service";
import { UniversidadDto } from "./dto/universidad.dto";
import { UniversidadCreatePipe } from "./universidad.create-pipe";

@Controller('universidad')
export class UniversidadController {

    constructor(private readonly universidadService: UniversidadService) {

    }

    @Get()
    traerTodos() {
        return this.universidadService.buscarTodos();
    }

    @Get(':id')
    obtenerPorId(
        @Param('id') idUniversidad
    ) {
        return this.universidadService.buscarPorId(idUniversidad);
    }

    @Post()
    @UsePipes(new UniversidadCreatePipe())
    crearUniversidad(
        @Body() universidadDto: UniversidadDto
    ) {
        return this.universidadService.crearUniversidad(universidadDto);
    }

}