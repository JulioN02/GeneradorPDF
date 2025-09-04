import { mostrarNotificacion } from './notificaciones.js';

/**
 * Inicializa la limpieza automática de errores
 */
export function inicializarLimpiezaErrores() {
    configurarLimpiezaCliente();
    configurarLimpiezaProductos();
}

/**
 * Limpia todos los errores del formulario
 */
export function limpiarTodosLosErrores() {
    const inputs = document.querySelectorAll('#facturaForm input, #facturaForm textarea');
    inputs.forEach(input => input.classList.remove('input-error'));
    const notificaciones = document.querySelectorAll('.notificacion-error');
    notificaciones.forEach(notif => notif.remove());
}

/**
 * Configura la limpieza automática para campos del cliente
 */
function configurarLimpiezaCliente() {
    const camposCliente = ['nombres', 'apellidos', 'celular', 'correo'];
    
    camposCliente.forEach(nombreCampo => {
        const campo = document.getElementById(nombreCampo);
        if (campo) {
            campo.addEventListener('input', debounce(() => limpiarErrorInput(campo)));
        }
    });
}

/**
 * Configura la limpieza automática para productos
 */
function configurarLimpiezaProductos() {
    const productosContainer = document.getElementById('productos-container');
    
    if (productosContainer) {
        const observer = new MutationObserver(() => {
            configurarEventosLimpiezaProductos();
        });
        
        observer.observe(productosContainer, {
            childList: true,
            subtree: true
        });
        
        configurarEventosLimpiezaProductos();
    }
}

/**
 * Configura eventos de limpieza para todos los productos actuales
 */
function configurarEventosLimpiezaProductos() {
    const filas = document.querySelectorAll('.producto-row');
    
    filas.forEach(fila => {
        const inputs = fila.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('input', debounce(() => limpiarErrorInput(input)));
        });
    });
}

/**
 * Limpia el error de un input cuando se empieza a escribir
 * @param {HTMLElement} input - Input a validar
 */
function limpiarErrorInput(input) {
    const valor = input.value.trim();

    if (input.type === 'text' && valor !== '') {
        input.classList.remove('input-error');
    }

    if (input.type === 'number' && valor !== '') {
        const numeroValor = parseFloat(valor);

        if (input.name === 'producto_cantidad[]') {
            if (numeroValor > 0) input.classList.remove('input-error');
        }

        if (input.name === 'producto_precio[]') {
            if (numeroValor >= 0) input.classList.remove('input-error');
        }

        if (input.name === 'producto_descuento[]') {
            if (numeroValor >= 0 && numeroValor <= 100) input.classList.remove('input-error');
        }
    }
}

/**
 * Debounce para optimizar eventos de input
 */
function debounce(fn, delay = 300) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}
