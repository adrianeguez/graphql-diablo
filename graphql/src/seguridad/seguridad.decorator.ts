import { ReflectMetadata } from '@nestjs/common';
export const Seguridad = (roles: any[]) => ReflectMetadata('seguridad', roles);