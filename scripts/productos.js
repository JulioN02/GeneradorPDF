import { mostrarNotificacion } from './notificaciones.js';
import { calcularTotales } from './calculos.js';

/**
 * Inicializa el sistema de productos
 */
export function inicializarProductos() {
    const productosContainer = document.getElementById('productos-container');
    const addProductoBtn = document.getElementById('addProducto');
    
    if (!productosContainer || !addProductoBtn) {
        console.error('Elementos de productos no encontrados');
        return;
    }
    
    // Agregar el primer producto por defecto
    if (productosContainer.children.length === 0) {
    agregarProducto(productosContainer);
  }
    
    // Evento para añadir nuevos productos
    addProductoBtn.addEventListener('click', () => {
        agregarProducto(productosContainer);
        calcularTotales(); // ✅ llamada directa
    });
}

/**
 * Crea y agrega una nueva fila de producto
 */
function agregarProducto(container) {
    if (container.children.length >= 50) {
        mostrarNotificacion('Límite máximo de productos alcanzado (50)', 'error');
        return;
    }

    const index = container.children.length;
    const fila = document.createElement('div');
    fila.classList.add('producto-row');
    
    fila.innerHTML = `
        <span class="producto-num">${index + 1}</span>
        <input type="text" id="producto_nombre_${index}" name="producto_nombre[]" placeholder="Producto / Servicio" required>
        <input type="number" id="producto_cantidad_${index}" name="producto_cantidad[]" placeholder="Cantidad" min="1" step="1" required>
        <input type="number" id="producto_precio_${index}" name="producto_precio[]" placeholder="Precio" min="0" step="0.01" required>
        <input type="number" id="producto_descuento_${index}" name="producto_descuento[]" placeholder="% Descuento" min="0" max="100" step="0.01">
        <input type="text" id="producto_observacion_${index}" name="producto_observacion[]" placeholder="Observación">
        <button type="button" class="eliminar-btn" aria-label="Eliminar producto">❌</button>
    `;
    
    // Configurar evento de eliminación
    const eliminarBtn = fila.querySelector('.eliminar-btn');
    eliminarBtn.addEventListener('click', () => {
        eliminarProducto(fila, container);
    });
    
    // Agregar eventos para recalcular
    const inputs = fila.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            calcularTotales(); // ✅ llamada directa
        });
    });
    
    container.appendChild(fila);
    actualizarProductos(container);
    calcularTotales(); // ✅ recalcula al agregar
}

/**
 * Elimina un producto específico
 */
function eliminarProducto(fila, container) {
    if (container.children.length > 1) {
        fila.remove();
        actualizarProductos(container);
        calcularTotales(); // ✅ llamada directa
    } else {
        mostrarNotificacion('Debe haber al menos un producto', 'error');
    }
}

/**
 * Actualiza la numeración y visibilidad de botones
 */
function actualizarProductos(container) {
    const filas = container.querySelectorAll('.producto-row');
    const soloUno = filas.length === 1;
    
    filas.forEach((fila, index) => {
        const numeroSpan = fila.querySelector('.producto-num');
        if (numeroSpan) {
            numeroSpan.textContent = index + 1;
        }
        
        const eliminarBtn = fila.querySelector('.eliminar-btn');
        if (eliminarBtn) {
            eliminarBtn.style.visibility = soloUno ? 'hidden' : 'visible';
        }
    });
}
