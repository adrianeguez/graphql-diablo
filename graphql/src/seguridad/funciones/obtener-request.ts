export function obtenerRequest(context) {
    return context.switchToHttp().getRequest();
}
