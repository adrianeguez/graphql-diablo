import { ParseIntPipe, UseGuards, HttpException, ForbiddenException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Root, Parent, Context, Info } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsuarioService } from './usuario.service';
import { UsuarioInterface, UsuarioCrearDtoInterface } from './interfaces/usuario.interface';
import { RolService } from 'rol/rol.service';

const pubSub = new PubSub();

@Resolver('Usuario')
export class UsuarioResolvers {
    constructor(private readonly usuarioService: UsuarioService,
        private readonly rolService: RolService) { }

    @Query()
    async obtenerUsuarios() {
        return await this.usuarioService.findAll();
    }

    @Query('usuario')
    async findOneById(
        @Args('id', ParseIntPipe) id: number,
    ): Promise<UsuarioInterface> {
        return await this.usuarioService.findOneById(id);
    }

    @Mutation('crearUsuario')
    async create(
        @Args() objeto: UsuarioCrearDtoInterface,
        @Root() root,
        @Parent() parent,
        @Context() context,
        @Info() info,
    ): Promise<UsuarioInterface> {
        console.log('usuario', objeto);
        console.log('root', root);
        console.log('parent', parent);
        console.log('context', context);
        console.log('info', info);
        // throw new ForbiddenException('Error');
        const usuarioCreado = await this.usuarioService.create(objeto.usuario);
        pubSub.publish('usuarioCreado', { usuarioCreado: usuarioCreado });
        usuarioCreado.rolId = this.rolService.findOneById(Number(usuarioCreado.rolId));
        return usuarioCreado;
    }

    @Subscription('usuarioCreado')
    catCreated() {
        return {
            subscribe: () => pubSub.asyncIterator('usuarioCreado'),
        };
    }
}

