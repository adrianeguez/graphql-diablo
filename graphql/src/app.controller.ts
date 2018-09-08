import { Get, Controller, Param, Post, Body, Query, Headers, HttpStatus, HttpCode, NotFoundException, Header, UseGuards, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { SeguridadManticoreLabsGuard } from 'seguridad/seguridad.guard';
import { tieneCabeceraSesionValida, tieneCabeceraSesionValidaPromesa, tieneCabeceraSesionValida$ } from 'politicas/tieneCabeceraSesionValida';
import { Seguridad } from 'seguridad/seguridad.decorator';
import { politicasController } from 'app.controller-politicas';
import { ManticoreLoggerService } from 'logger/logger.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly manticoreLoggerService: ManticoreLoggerService) { }

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
  @UseGuards(SeguridadManticoreLabsGuard)
  @Seguridad(politicasController.hola)
  hola(

  ) {
    this.manticoreLoggerService.error('pene','trace');
    this.manticoreLoggerService.warn('pene','trace');
    this.manticoreLoggerService.log('pene','trace');
    return 'Hola';
  }

  @Post('subir')
  @UseInterceptors(FileInterceptor('file'))
  subirArchivo(@UploadedFile() file) {
    console.log(file);
    return 'ok';
  }

}
