import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsuarioModule } from 'usuario/usuario.module';
import { RolModule } from 'rol/rol.module';
import * as GraphQLJSON from 'graphql-type-json';
import { DateScalar } from 'scalars/date.scalar';
import { UniversidadModule } from 'universidad/universidad.module';
import { LoggerModule } from 'logger/logger.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    UniversidadModule,
    UsuarioModule,
    RolModule,
    LoggerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DateScalar
  ],
})
export class AppModule { }
