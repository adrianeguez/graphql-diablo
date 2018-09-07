export function obtenerReflectorSeguridad(variableThis, context: any) {
    return variableThis.reflector.get('seguridad', context.getHandler())
}