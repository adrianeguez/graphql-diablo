import { Observable, from, of } from "rxjs";

export function convertirArregloEnArregloDeObservables(arregloFunciones: any[], request, response): Observable<any>[] {
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