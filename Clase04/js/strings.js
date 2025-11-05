(function (){
    const btn = document.getElementById("btn-strings");
    const out = document.getElementById("out-strings");
    const log = (m)=> out.textContent += m + "\n";

    btn.addEventListener("click", () => {
     out.textContent = "";

     const curso= "Inteligencia Artificial";
     const escuela = "CERTUS"
     const frase = `${escuela} - ${curso} 2025`

     log(`Plantilla: ${frase}`);
     log(`Longitud: ${frase.length}`)
     log(`toUpperCase() "${frase.toUpperCase()}"`);
     log(`includes("2025"): ${frase.includes("2025")}`);
     log(`replaceAll(" ", "_"): "${frase.replaceAll(" ", "_")}"`);

     //Manejo de espacios
     const espacios="    datos con    espacios    ";
     log(`\nOriginal: "${espacios}"`);
     log(`trim(): "${espacios.trim()}"`);
     log(`split("  ") ${JSON.stringify(espacios.split(""))}`);
     
});
})();