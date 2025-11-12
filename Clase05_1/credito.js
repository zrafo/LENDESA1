
const qs = (sel) => document.querySelector(sel);
const show = (step) => {
  document.querySelectorAll("[data-step]").forEach(s => s.style.display = "none");
  const el = document.querySelector(`[data-step="${step}"]`);
  if (el) el.style.display = "";
};
const setOut = (id, msg) => { qs(id).textContent = msg; };

// Validaciones simples
const notEmpty = (v) => (v ?? "").toString().trim().length > 0;
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v ?? "").trim());

document.addEventListener("DOMContentLoaded", () => {
  // Navegación
  qs("#toStep2").addEventListener("click", () => {
    const nombre = qs("#nombres").value;
    const dni = qs("#dni").value;
    const cel = qs("#cel").value;
    const correo = qs("#correo").value;

    if (!notEmpty(nombre) || !notEmpty(dni) || !notEmpty(cel) || !validEmail(correo)) {
      setOut("#outStep1", "Completa todos los campos y verifica que el correo sea válido.");
      return;
    }
    setOut("#outStep1", "✔ Datos personales validados.");
    show(2);
  });

  qs("#back1").addEventListener("click", () => show(1));
  qs("#toStep3").addEventListener("click", () => {
    // Validación mínima del paso 2
    const monto = parseFloat(qs("#monto").value);
    const tasa = parseFloat(qs("#tasa").value);
    const plazo = parseInt(qs("#plazo").value, 10);
    if (Number.isNaN(monto) || monto <= 0 || Number.isNaN(tasa) || tasa <= 0 || Number.isNaN(plazo) || plazo < 6) {
      setOut("#outCalc", "Revisa monto, tasa (>0) y plazo (≥ 6 meses).");
      return;
    }
    setOut("#outCalc", "Parámetros del crédito guardados.");
    show(3);
  });
  qs("#back2").addEventListener("click", () => show(2));

  // Cálculo de cuota
  qs("#calcCuota").addEventListener("click", () => {
    const monto = parseFloat(qs("#monto").value);
    const tasaAnual = parseFloat(qs("#tasa").value);
    const n = parseInt(qs("#plazo").value, 10);

    if (Number.isNaN(monto) || Number.isNaN(tasaAnual) || Number.isNaN(n) || n <= 0) {
      setOut("#outCalc", "Ingresa monto, tasa anual y plazo válidos.");
      return;
    }

    const r = (tasaAnual / 100) / 12; // tasa mensual
    const cuota = r === 0 ? (monto / n) : (monto * r) / (1 - Math.pow(1 + r, -n));
    setOut("#outCalc", `Cuota estimada: S/ ${cuota.toFixed(2)} (tasa mensual ${(r*100).toFixed(3)}%)`);
  });

  // Pre-evaluación: calcula DTI y da una recomendación
  qs("#preEvaluar").addEventListener("click", () => {
    const ingresos = parseFloat(qs("#ingresos").value);
    const deudas = parseFloat(qs("#deudas").value);
    const riesgo = qs("#riesgo").value;

    // Reutiliza cuota del paso 2 (si no la calcularon, la calculamos aquí)
    const monto = parseFloat(qs("#monto").value);
    const tasaAnual = parseFloat(qs("#tasa").value);
    const n = parseInt(qs("#plazo").value, 10);
    const r = (tasaAnual / 100) / 12;
    const cuota = r === 0 ? (monto / n) : (monto * r) / (1 - Math.pow(1 + r, -n));

    if (Number.isNaN(ingresos) || ingresos <= 0 || Number.isNaN(deudas) || deudas < 0) {
      setOut("#outEval", "Revisa tus ingresos y deudas mensuales.");
      return;
    }

    const dti = (deudas + cuota) / ingresos; // relación deuda/ingreso
    let umbral;
    switch (riesgo) {
      case "bajo": umbral = 0.55; break;
      case "medio": umbral = 0.40; break;
      default: umbral = 0.35; // alto riesgo => más estricto
    }

    const estado = dti <= umbral ? "APTO (pre-evaluación favorable)" : "OBSERVADO (excede umbral DTI)";
    setOut("#outEval",
      `Cuota: S/ ${cuota.toFixed(2)} | DTI: ${(dti*100).toFixed(1)}% | Umbral: ${(umbral*100).toFixed(0)}% → ${estado}`
    );
  });

  // Envío (simulado) + resumen
  qs("#enviar").addEventListener("click", () => {
    const nombre = qs("#nombres").value.trim();
    const dni = qs("#dni").value.trim();
    const correo = qs("#correo").value.trim();
    const cel = qs("#cel").value.trim();

    const monto = parseFloat(qs("#monto").value);
    const tasaAnual = parseFloat(qs("#tasa").value);
    const plazo = parseInt(qs("#plazo").value, 10);

    const ingresos = parseFloat(qs("#ingresos").value);
    const deudas = parseFloat(qs("#deudas").value);
    const actividad = qs("#actividad").value;
    const riesgo = qs("#riesgo").value;

    if ([nombre, dni, correo, cel].some(v => !notEmpty(v)) ||
        [monto, tasaAnual, plazo, ingresos, deudas].some(v => Number.isNaN(v))) {
      alert("Faltan datos o hay valores inválidos. Revisa todos los pasos.");
      return;
    }

    // Recalcular cuota
    const r = (tasaAnual / 100) / 12;
    const cuota = r === 0 ? (monto / plazo) : (monto * r) / (1 - Math.pow(1 + r, -plazo));
    const dti = (deudas + cuota) / ingresos;

    // Render del resumen
    const resumen = `
      <strong>Solicitante:</strong> ${nombre} (DNI: ${dni})<br/>
      <strong>Contacto:</strong> ${correo} | ${cel}<br/>
      <strong>Crédito:</strong> S/ ${monto.toFixed(2)} a ${plazo} meses, tasa anual ${tasaAnual}%<br/>
      <strong>Cuota estimada:</strong> S/ ${cuota.toFixed(2)}<br/>
      <strong>Ingresos/Deudas:</strong> S/ ${ingresos.toFixed(2)} / S/ ${deudas.toFixed(2)}<br/>
      <strong>DTI:</strong> ${(dti*100).toFixed(1)}%<br/>
      <strong>Actividad:</strong> ${actividad} | <strong>Riesgo:</strong> ${riesgo}<br/>
      <em>Enviado (simulación). Esta demo no guarda información.</em>
    `;
    qs("#resumenContenido").innerHTML = resumen;
    qs("#resumen").style.display = "";
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
});
