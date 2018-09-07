import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { mergeMap, map, switchMap, every } from 'rxjs/operators';
import { Reflector } from '@nestjs/core'; @Injectable()
export class RolesGuard implements CanActivate {
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

function obtenerRequest(context) {
    return context.switchToHttp().getRequest();
}

function obtenerResponse(context) {
    return context.switchToHttp().getResponse();
}

function obtenerReflectorSeguridad(variableThis, context: any) {
    return variableThis.reflector.get('seguridad', context.getHandler())
}

function convertirArregloEnArregloDeObservables(arregloFunciones: any[], request, response): Observable<any>[] {
    const arregloObservables = [];

    arregloFunciones.forEach((funcion) => {
        const esFuncion = typeof funcion === 'function';
        if (esFuncion) {
            const esPromesa = typeof funcion(request, response).then === 'function';
            if (esPromesa) {
                const promesa = funcion(request, response);
                arregloObservables.push(from(promesa))
            } else {
                const respuesta = funcion(request, response)
                arregloObservables.push(of(respuesta))
            }
        }
        const esObservable = funcion instanceof Observable;
        if (esObservable) {
            arregloObservables.push(funcion);
        }
    });

    return arregloObservables;
}

function tieneAccesoPermitido(solucion, request, response): boolean {
    const solucionEsFuncion = typeof solucion === 'function';
    if (solucionEsFuncion) {
        const respuesta = solucion(request, response);
        return respuesta;
    } else {
        return solucion;
    }
}