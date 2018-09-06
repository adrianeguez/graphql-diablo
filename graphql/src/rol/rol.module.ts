import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolResolvers } from './rol.resolvers';
@Module({
    providers: [RolService, RolResolvers],
})
export class RolModule { }