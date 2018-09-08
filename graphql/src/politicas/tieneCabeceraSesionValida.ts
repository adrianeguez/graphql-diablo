import { of } from "rxjs";

const fs = require('fs');

export function tieneCabeceraSesionValida(req, res): boolean {
    if (req && res) {
        console.log('Llego request y response a funcion');
    }
    return true;
}

export const tieneCabeceraSesionValidaPromesa = (request, response) => {
    return new Promise((resolve, reject) => {
        fs.readFile('', 'utf8', (errorLeyendo, datoLectura) => {
            if (request && response) {
                console.log('Llego request y response a funcion Promesa');
                resolve(true)
            }
        });
    })
};

export function tieneCabeceraSesionValidaObservable(request, response): boolean {
    if (request && response) {
        console.log('Llego request y response a funcion observable');
    }
    return true;
}


export const tieneCabeceraSesionValida$ = of(tieneCabeceraSesionValidaObservable)