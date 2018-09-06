import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioResolvers } from './usuario.resolvers';
import { RolService } from 'rol/rol.service';

@Module({
    providers: [UsuarioService, UsuarioResolvers, RolService],
})
export class UsuarioModule { }