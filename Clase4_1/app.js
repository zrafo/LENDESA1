const $item = document.getElementById("item");
const $btn = document.getElementById("btnAgregar");
const $lista = document.getElementById("lista");

const compras = []

function render(){
    $lista.innerHTML ="";

    compras.forEach((texto, idx)=>{
        const li = document.createElement("li");
        li.textContent = texto;
        const btnDel = document.createElement("button");
        btnDel.textContent="Quitar"
        btnDel.addEventListener("click",()=>{
            compras.splice(idx,1);
            render();
        });
        li.appendChild(btnDel);
        $lista.appendChild(li);
    });
}

$btn.addEventListener("click",()=>{
    const valor = $item.value.trim();
    if (!valor) return;
    compras.push(valor);
    $item.value=""
    render();
});
