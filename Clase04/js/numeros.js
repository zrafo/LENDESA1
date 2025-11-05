(function () {
  const btn = document.getElementById("btn-numeros");
  const out = document.getElementById("out-numeros");
  const log = (m)=> out.textContent += m + "\n";


  btn.addEventListener("click", () => {
    out.textContent = "";


    const a = 10;
    const b = 3;
    log(`a = ${a}, b = ${b}`);
    log(`a + b = ${a + b}`);
    log(`a - b = ${a - b}`);
    log(`a * b = ${a * b}`);
    log(`a / b = ${a / b}`);
    log(`a % b = ${a % b}`);
    log(`a ** b = ${a ** b}`);


    // Redondeo y formateo
    const pi = Math.PI;
    log(`\nPI: ${pi}`);
    log(`PI.toFixed(2): ${pi.toFixed(2)}`);

    // NaN e Infinity
    const invalido = Number("hola"); // NaN
    log(`\nNumber("hola") => ${invalido} | isNaN? ${Number.isNaN(invalido)}`);


    // Parseo seguro
    log(`parseInt("08") => ${parseInt("08")}`);
    log(`Number("3.14") => ${Number("3.14")}`);

    // Math utilidades
    log(`\nMath.floor(3.9) = ${Math.floor(3.9)}`);
    log(`Math.ceil(3.1)  = ${Math.ceil(3.1)}`);
    log(`Math.round(3.5) = ${Math.round(3.5)}`);
    log(`Random [0,1): ${Math.random()}`);


  });
})();


