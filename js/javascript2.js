function demo93(){
    let mensaje ="";
    const x=7;
    if (x%2 === 1){
        mensaje = "x es impar";
    } else {
        mensaje = "x es par";
    }

    document.getElementById("out-9-3").textContent = mensaje;
}