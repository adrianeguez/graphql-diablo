import { tieneCabeceraSesionValida, tieneCabeceraSesionValidaPromesa } from "politicas/tieneCabeceraSesionValida";

export const politicasController = {
    hola:[
        tieneCabeceraSesionValida, 
        tieneCabeceraSesionValidaPromesa, 
        tieneCabeceraSesionValida
    ]
}