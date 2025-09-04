import { mostrarNotificacion } from './notificaciones.js';

/**
 * Valida todos los campos del formulario de factura
 * @returns {boolean} - true si todos los campos son válidos
 */
export function validarFormulario() {
    limpiarErrores(); // siempre limpia antes
    let errores = [];

    if (!validarCliente(errores)) return false;
    if (!validarProductos(errores)) return false;

    if (errores.length > 0) {
        // Mostrar solo la primera notificación para no saturar
        mostrarNotificacion(errores[0], 'error');
        return false;
    }
    return true;
}

/**
 * Valida los datos del cliente
 * @param {string[]} errores - array para acumular errores
 * @returns {boolean}
 */
function validarCliente(errores) {
    let esValido = true;

    const campos = {
        nombres: document.getElementById("nombres"),
        apellidos: document.getElementById("apellidos"),
        correo: document.getElementById("correo")
    };

    Object.entries(campos).forEach(([key, campo]) => {
        if (!campo) return;
        const valor = campo.value.trim();

        if (valor === "") {
            campo.classList.add("input-error");
            errores.push(`${capitalizar(key)} es obligatorio`);
            esValido = false;
        } else if (key === 'correo') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
                campo.classList.add('input-error');
                errores.push('El correo electrónico no es válido');
                esValido = false;
            }
        }
    });

    const celular = document.getElementById('celular');
    if (celular) {
        const valorCelular = celular.value.trim();
        if (valorCelular !== '') {
            // Permite +57XXXXXXXXXX o 10 dígitos (ejemplo: 3001234567)
            const phoneRegex = /^(\+57)?[0-9]{10}$/;
            if (!phoneRegex.test(valorCelular)) {
                celular.classList.add('input-error');
                errores.push('El número de celular no es válido (ej: +573001234567 o 3001234567)');
                esValido = false;
            }
        }
    }

    return esValido;
}

/**
 * Valida todos los productos en el formulario
 * @param {string[]} errores
 * @returns {boolean}
 */
function validarProductos(errores) {
    let esValido = true;
    const filas = document.querySelectorAll(".producto-row");

    if (filas.length === 0) {
        errores.push('Debe agregar al menos un producto');
        return false;
    }

    filas.forEach((fila, index) => {
        const nombre = fila.querySelector("input[name='producto_nombre[]']");
        const cantidad = fila.querySelector("input[name='producto_cantidad[]']");
        const precio = fila.querySelector("input[name='producto_precio[]']");

        if (!nombre || !nombre.value.trim()) {
            if (nombre) nombre.classList.add("input-error");
            errores.push(`El nombre del producto ${index + 1} es obligatorio`);
            esValido = false;
        }

        if (!cantidad || parseFloat(cantidad.value) <= 0) {
            if (cantidad) cantidad.classList.add("input-error");
            errores.push(`La cantidad del producto ${index + 1} debe ser mayor a 0`);
            esValido = false;
        }

        if (!precio || parseFloat(precio.value) < 0) {
            if (precio) precio.classList.add("input-error");
            errores.push(`El precio del producto ${index + 1} no puede ser negativo`);
            esValido = false;
        }
    });

    return esValido;
}

/**
 * Limpia clases de error previas
 */
function limpiarErrores() {
    document.querySelectorAll(".input-error").forEach(el => {
        el.classList.remove("input-error");
    });
}

/**
 * Capitaliza la primera letra de un texto
 * @param {string} texto
 * @returns {string}
 */
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
