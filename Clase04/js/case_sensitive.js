// JavaScript es sensible a mayúsculas y minúsculas (case sensitive).
// Este ejercicio muestra cómo nombres "parecidos" son distintos.


(function () {
  const btn = document.getElementById("btn-case");
  const out = document.getElementById("out-case");

  function log(msg) {
    out.textContent += msg + "\n";
  }

  // Variables que difieren solo por mayúsculas
  const nombre = "rafael";
  const Nombre = "Rafael";
  const NOMBRE = "RAFAEL";

  // Funciones con nombres similares
  function suma(a, b) { return a + b; }
  function Suma(a, b) { return a + b + 1; } // intencionalmente diferente


  btn.addEventListener("click", () => {
    out.textContent = ""; // limpia

    log(`nombre: ${nombre}`);
    log(`Nombre: ${Nombre}`);
    log(`NOMBRE: ${NOMBRE}`);

    log(`\n¿nombre === Nombre? ${nombre === Nombre}`);
    log(`¿Nombre === NOMBRE? ${Nombre === NOMBRE}`);

    log(`\nsuma(2,3) = ${suma(2,3)}  (función en minúsculas)`);
    log(`Suma(2,3) = ${Suma(2,3)}  (función con 'S' mayúscula)`);

  });
})();
