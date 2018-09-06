import { Injectable } from '@nestjs/common';
import { RolInterface } from './interfaces/rol.interface';

@Injectable()
export class RolService {
    private recnum = 1;
    private readonly roles: RolInterface[] = [
        {
            id: 1,
            nombre: 'Administrador'
        }
    ];



    create(rol: RolInterface): RolInterface {
        this.recnum += 1;
        rol.id = this.recnum;
        this.roles.push(rol);
        return rol;
    }

    findAll(): RolInterface[] {
        return this.roles;
    }

    findOneById(id: number): RolInterface {
        return this.roles.find(usuario => usuario.id === id);
    }
}