let usuario = localStorage.getItem("usuario");
let saldo = Number(localStorage.getItem("saldo")) || 0;
let operacion = "";

// LOGIN
function login() {
    const nombre = document.getElementById("nombre").value;

    if (nombre.trim() === "") {
        alert("Ingresa un nombre");
        return;
    }

    localStorage.setItem("usuario", nombre);
    localStorage.setItem("saldo", 100); // saldo inicial simple

    window.location.href = "menu.html";
}

// CARGAR NOMBRE EN EL MENÚ
if (window.location.pathname.includes("menu.html")) {
    document.getElementById("titulo").innerText = "Bienvenido, " + usuario;
}

// IR A OPERACIONES
function verOperaciones(tipo) {
    localStorage.setItem("operacion", tipo);
    window.location.href = "operaciones.html";
}

// OPERACIONES
if (window.location.pathname.includes("operaciones.html")) {
    operacion = localStorage.getItem("operacion");

    const texto = document.getElementById("resultado");
    const contenedor = document.getElementById("contenedor-input");

    if (operacion === "ver") {
        texto.innerText = "Tu saldo actual es: S/ " + saldo;
    }

    if (operacion === "deposito") {
        texto.innerText = "Ingresa el monto a depositar:";
        contenedor.style.display = "block";
    }

    if (operacion === "retiro") {
        texto.innerText = "Ingresa el monto a retirar:";
        contenedor.style.display = "block";
    }
}

// PROCESAR DEPÓSITO / RETIRO
function procesarOperacion() {
    let monto = Number(document.getElementById("monto").value);

    if (monto <= 0) {
        alert("Monto inválido");
        return;
    }

    if (operacion === "deposito") {
        saldo += monto;
    }

    if (operacion === "retiro") {
        if (monto > saldo) {
            alert("Saldo insuficiente");
            return;
        }
        saldo -= monto;
    }

    localStorage.setItem("saldo", saldo);

    alert("Operación realizada. Nuevo saldo: S/ " + saldo);
    window.location.href = "menu.html";
}

// VOLVER
function volver() {
    window.location.href = "menu.html";
}
