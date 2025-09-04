// main.js
import { inicializarProductos } from "./scripts/productos.js";
import { inicializarCalculos } from "./scripts/calculos.js";
import { inicializarLimpiezaErrores, limpiarTodosLosErrores } from "./scripts/limpiar-errores.js";
import { mostrarNotificacion } from "./scripts/notificaciones.js"; // <- única fuente

// ⚠️ IMPORTANTE: elimina cualquier definición local de `mostrarNotificacion` en este archivo.

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  console.log("🚀 Inicializando aplicación de facturación...");

  // 1) Productos primero (crea la fila inicial y engancha el botón)
  runStep("Productos", inicializarProductos);

  // 2) Cálculos (observadores + totales iniciales)
  runStep("Cálculos", inicializarCalculos);

  // 3) Limpieza de errores (quita clases de error al tipear, etc.)
  runStep("Limpieza de errores", inicializarLimpiezaErrores);

  // 4) Formulario (submit)
  initFormulario();

  console.log("✅ Aplicación inicializada");
}

function runStep(nombre, fn) {
  try {
    fn?.();
    console.log(`✅ ${nombre} listo`);
  } catch (err) {
    console.error(` Error iniciando ${nombre}:`, err);
    try { mostrarNotificacion(`Error iniciando ${nombre}`, "error"); } catch (_) {}
  }
}

function initFormulario() {
  const form = document.getElementById("facturaForm");
  if (!form) {
    console.error(" No se encontró el formulario #facturaForm");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    actualizarCamposOcultos();

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, { method: "POST", body: formData });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      if (result.status === "success") {
        mostrarModalFactura(result.id);
      } else {
        mostrarNotificacion(result.message || "No se pudo generar la factura", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      mostrarNotificacion("Error de conexión con el servidor", "error");
    }
  });
}

function actualizarCamposOcultos() {
  const campos = {
    inputTotalSinDescuento: "totalSinDescuento",
    inputTotalConDescuento: "totalConDescuento",
    inputTotalConIva: "totalConIva",
  };

  Object.entries(campos).forEach(([inputId, spanId]) => {
    const input = document.getElementById(inputId);
    const span = document.getElementById(spanId);
    if (input && span) {
      const valor = span.textContent.replace(/[$,]/g, "") || "0";
      input.value = valor;
    }
  });
}

function mostrarModalFactura(idFactura) {
  const overlay = document.createElement("div");
  overlay.className = "overlay-modal";
  Object.assign(overlay.style, {
    position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center",
    alignItems: "center", zIndex: "9999",
  });

  const modal = document.createElement("div");
  Object.assign(modal.style, {
    background: "#fff", padding: "20px", borderRadius: "10px", textAlign: "center",
    maxWidth: "400px", width: "90%", boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.3s ease",
  });

  modal.innerHTML = `
    <h3 style="margin-bottom: 10px;">Factura guardada</h3>
    <p>Factura guardada correctamente con ID: <b>${idFactura}</b></p>
    <div style="margin-top:20px; display:flex; justify-content:space-around; gap:10px;">
      <button id="btnDescargarFactura" style="padding:8px 15px; border:none; background:#007bff; color:white; border-radius:5px; cursor:pointer;">Descargar Factura</button>
      <button id="btnAceptar" style="padding:8px 15px; border:none; background:#28a745; color:white; border-radius:5px; cursor:pointer;">Aceptar</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  document.getElementById("btnDescargarFactura").addEventListener("click", () => {
    window.open(`/phps/descargarFactura.php?id=${idFactura}`, "_blank");
  });

  document.getElementById("btnAceptar").addEventListener("click", () => {
    if (confirm("¿Seguro que desea limpiar el formulario?")) {
      overlay.remove();
      const form = document.getElementById("facturaForm");
      if (form) {
        form.reset();
        try { limpiarTodosLosErrores(); } catch (_) {}
      }
    }
  });
}
