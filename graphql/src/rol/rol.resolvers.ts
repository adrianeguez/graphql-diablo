import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { RolService } from './rol.service';
import { RolInterface } from './interfaces/rol.interface';

const pubSub = new PubSub();

@Resolver('Rol')
export class RolResolvers {
    constructor(private readonly rolService: RolService) { }

    @Query()
    async obtenerRoles() {
        return await this.rolService.findAll();
    }

    @Query('rol')
    async encontrarRolPorId(
        @Args('id', ParseIntPipe) id: number,
    ): Promise<RolInterface> {
        return await this.rolService.findOneById(id);
    }

    @Mutation('crearRol')
    async crear(@Args() args: RolInterface): Promise<RolInterface> {
        const rolCreado = await this.rolService.create(args);
        pubSub.publish('rolCreado', { rolCreado: rolCreado });
        return rolCreado;
    }

    @Subscription('rolCreado')
    rolCreado() {
        return {
            subscribe: () => pubSub.asyncIterator('rolCreado'),
        };
    }
}