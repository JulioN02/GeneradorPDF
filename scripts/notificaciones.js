/**
 * Muestra una notificación en pantalla
 * @param {string} mensaje - Texto del mensaje
 * @param {string} tipo - Tipo de notificación ('success' | 'error')
 */
export function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo === 'error' ? 'notificacion-error' : 'notificacion-exito'}`;
    notificacion.textContent = mensaje;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}
