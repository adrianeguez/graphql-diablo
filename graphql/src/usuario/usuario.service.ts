import { Injectable } from '@nestjs/common';
import { UsuarioInterface } from './interfaces/usuario.interface';

@Injectable()
export class UsuarioService {
    private recnum = 1;
    private readonly usuarios: UsuarioInterface[] = [
        {
            id: 1,
            rolId: 1,
            nombre: 'Adrian',
            casado: false,
            edad: 29,
            sueldo: 124.23,
            fechaNacimiento: new Date()
        }
    ];



    create(usuario: UsuarioInterface): UsuarioInterface {
        this.recnum += 1;
        usuario.id = this.recnum;
        this.usuarios.push(usuario);
        return usuario;
    }

    findAll(): UsuarioInterface[] {
        return this.usuarios;
    }

    findOneById(id: number): UsuarioInterface {
        return this.usuarios.find(usuario => usuario.id === id);
    }
}