import { Get, Controller, Param, Post, Body, Query, Headers, HttpStatus, HttpCode, NotFoundException, Header, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Seguridad } from 'politicas/seguridad.decorator';
import { of, from } from 'rxjs';
import { RolesGuard } from 'seguridad/seguridad.guard';
import { tieneCabeceraSesionValida, tieneCabeceraSesionValidaPromesa, tieneCabeceraSesionValida$ } from 'politicas/tieneCabeceraSesionValida';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('usuario/:id')
  @HttpCode(201)
  @Header('cache', 'tes')
  root(
    @Param('id') identificador,
    @Body('nombre') nombreUsuario,
    @Query('apellido') apellidoUsuario,
    @Headers('token') tokenUsuario,
  ): any {
    // throw new NotFoundException('No encontrado');

    return {
      identificador,
      nombreUsuario,
      apellidoUsuario,
      tokenUsuario
    };
  }


  @Get('hola')
  @UseGuards(RolesGuard)
  @Seguridad([tieneCabeceraSesionValida, tieneCabeceraSesionValidaPromesa, tieneCabeceraSesionValida$])
  hola(

  ) {
    return 'Hola';
  }
}
