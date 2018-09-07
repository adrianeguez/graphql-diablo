export function tieneAccesoPermitido(solucion, request, response): boolean {
    const solucionEsFuncion = typeof solucion === 'function';
    if (solucionEsFuncion) {
        const respuesta = solucion(request, response);
        return respuesta;
    } else {
        return solucion;
    }
}