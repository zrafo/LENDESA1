(function () {
    const btn = document.getElementById("btn-tipos");
    const out = document.getElementById("out-tipos");
    const log = (m)=> out.textContent += m + "\n";

    btn.addEventListener("click", () => {
        out.textContent= "";

        const muestras ={
            numero: 42,
            decimal: 3.14,
            string : "Hola",
            booleano: true,
            nulo: null,
            indefinido: undefined,
            objeto: { a:1 },
            arreglo: [1,2,3],
            funcion: function(){},
            simbolo: Symbol("id"),
            bigint: 90884782748241n 
        };

        for (const [k,v] of Object.entries(muestras)) {
            log(`${k.padEnd(10)} -> valor: ${String(v)} | typeof: ${typeof v}`);
        }

        log("\nOjo: ")
        log("typeo null === 'object' //legado");
        log("Array.isArray([1,2,3]) === true");
        log("Number.isNaN(NaN) === true, pero typeof NaN === 'number");

    })
})();