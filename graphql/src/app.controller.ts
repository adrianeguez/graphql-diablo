import { Get, Controller, Param, Post, Body, Query, Headers, HttpStatus, HttpCode, NotFoundException, Header, UseGuards, UseInterceptors, FileInterceptor, UploadedFile, HttpService, FilesInterceptor, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SeguridadManticoreLabsGuard } from 'seguridad/seguridad.guard';
import { tieneCabeceraSesionValida, tieneCabeceraSesionValidaPromesa, tieneCabeceraSesionValida$ } from 'politicas/tieneCabeceraSesionValida';
import { Seguridad } from 'seguridad/seguridad.decorator';
import { politicasController } from 'app.controller-politicas';
import { ManticoreLoggerService } from 'logger/logger.service';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly manticoreLoggerService: ManticoreLoggerService,
    private readonly httpService: HttpService) { }

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
    @Res() res
  ) {


    this.manticoreLoggerService.error('error', 'trace');
    this.manticoreLoggerService.warn('warn', 'trace');
    this.manticoreLoggerService.log('log', 'trace');
    /*
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        map((req) => {
          console.log('req', req)
          return req.data;
        })
      );
      */
     return res.download('\\upload\\04689bf5200f0c67179c40f18b31b6e1', 'nombre.docx')
  }

  @Post('subir')
  @UseInterceptors(FileInterceptor('file'))
  subirArchivo(
    @UploadedFile() file
  ) {
    console.log(file);
    return 'ok';
  }

}
