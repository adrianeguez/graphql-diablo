import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { mergeMap, map, switchMap, every } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { obtenerReflectorSeguridad, obtenerRequest, obtenerResponse, convertirArregloEnArregloDeObservables, tieneAccesoPermitido } from './funciones';


@Injectable()
export class SeguridadManticoreLabsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext) {
        const arregloSeguridad = obtenerReflectorSeguridad(this, context);
        const request = obtenerRequest(context);
        const response = obtenerResponse(context);
        const arregloSeguridad$ = of(arregloSeguridad);
        return arregloSeguridad$
            .pipe(
                switchMap((arregloFunciones: any[]) => {
                    const arregloObservables = convertirArregloEnArregloDeObservables(arregloFunciones, request, response);
                    const funcionesDeSeguridad$ = of(...arregloObservables);
                    return funcionesDeSeguridad$
                        .pipe(
                            mergeMap((solucionObservable) => solucionObservable),
                            every((solucion: any) => tieneAccesoPermitido(solucion, request, response))
                        );
                })
            );
    }
}







