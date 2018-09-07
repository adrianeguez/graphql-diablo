export function obtenerResponse(context) {
    return context.switchToHttp().getResponse();
}
