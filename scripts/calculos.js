/** 
 * Inicializa los cálculos automáticos 
 */
export function inicializarCalculos() {
  const productosContainer = document.getElementById("productos-container");
  if (!productosContainer) {
    console.error("❌ Contenedor de productos no encontrado");
    return;
  }

  // Observar cambios en los productos
  const observer = new MutationObserver(() => {
    configurarEventosCalculos();
    calcularTotales();
  });
  observer.observe(productosContainer, { childList: true, subtree: true });

  // Configuración inicial
  configurarEventosCalculos();
  calcularTotales();
}

/** 
 * Configura eventos de cálculo para todos los productos 
 */
function configurarEventosCalculos() {
  const filas = document.querySelectorAll(".producto-row");
  filas.forEach((fila) => {
    const inputs = fila.querySelectorAll('input[type="number"]');
    inputs.forEach((input) => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("change", calcularTotales);
      input.addEventListener("input", handleInput);
      input.addEventListener("change", calcularTotales);
    });
  });
}

// Debounce para optimizar eventos
const handleInput = debounce(() => calcularTotales(), 300);

/** 
 * Calcula todos los totales de la factura 
 */
export function calcularTotales() {
  const filas = document.querySelectorAll(".producto-row");

  let subtotal = 0;
  let totalDescuentos = 0;

  filas.forEach((fila) => {
    let cantidad = parseFloat(fila.querySelector('input[name="producto_cantidad[]"]')?.value) || 0;
    let precio = parseFloat(fila.querySelector('input[name="producto_precio[]"]')?.value) || 0;
    let descuento = parseFloat(fila.querySelector('input[name="producto_descuento[]"]')?.value) || 0;

    // Validaciones
    cantidad = Math.max(cantidad, 0);
    precio = Math.max(precio, 0);
    descuento = Math.min(Math.max(descuento, 0), 100);

    // Subtotales
    const subtotalProducto = cantidad * precio;
    const descuentoProducto = (subtotalProducto * descuento) / 100;

    subtotal += subtotalProducto;
    totalDescuentos += descuentoProducto;
  });

  const totalFinal = subtotal - totalDescuentos;

  // Actualizar UI
  actualizarElementoTotal("totalSinDescuento", subtotal);
  actualizarElementoTotal("totalDescuentos", totalDescuentos);
  actualizarElementoTotal("totalFinal", totalFinal);

  // Inputs hidden para backend
  actualizarInputHidden("inputTotalSinDescuento", subtotal);
  actualizarInputHidden("inputTotalDescuentos", totalDescuentos);
  actualizarInputHidden("inputTotalFinal", totalFinal);
}

/** 
 * Helpers 
 */
function actualizarElementoTotal(elementId, valor) {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    elemento.textContent = formatearMoneda(valor);
  }
}

function actualizarInputHidden(id, valor) {
  const input = document.getElementById(id);
  if (input) {
    // Solo el número puro con punto decimal
    input.value = Number(valor.toFixed(2));
  }
}


function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(valor);
}

function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
