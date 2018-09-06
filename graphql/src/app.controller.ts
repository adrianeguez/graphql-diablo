import { Get, Controller, Param, Post, Body, Query, Headers, HttpStatus, HttpCode, NotFoundException, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('usuario/:id')
  @HttpCode(201)
  @Header('cache','tes')
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
}
