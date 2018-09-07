import { ReflectMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';

export const Seguridad = (roles: any[]) => ReflectMetadata('seguridad', roles);