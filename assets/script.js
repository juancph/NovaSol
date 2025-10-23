let header = document.querySelector("header")

window.addEventListener("scroll", () => {
    if(window.scrollY > 190){
        header.classList.add("fijo")
    }else{
        header.classList.remove("fijo")
    }
})

//Calculadora
let sectionCalculadora = document.getElementById("section6")
let barra = document.getElementById("barra")
let barra2 = document.getElementById("barra2")
let enviar = document.getElementById("enviar")
let interno1 = document.querySelector("#interno1")
let interno2 = document.querySelector("#interno2")
let textoGrafico1 = document.querySelector("#textoGrafico1")
let textoGrafico2 = document.querySelector("#textoGrafico2")
let figure = sectionCalculadora.querySelector("figure")

enviar.addEventListener("click", () => {
    let consumo = parseFloat(barra.value)
    let potenciaW = parseFloat(barra2.value)

    if (isNaN(consumo) || isNaN(potenciaW)) {
        alert("Por favor ingrese ambos valores")
        return
    }

    let potenciaKW = potenciaW / 1000

    let horasSolDia = 5

    let energiaMensualPaneles = potenciaKW * horasSolDia * 30

    let porcentajeRenovable = (energiaMensualPaneles / consumo) * 100
    if (porcentajeRenovable > 100) porcentajeRenovable = 100

    let porcentajeNoRenovable = 100 - porcentajeRenovable

    textoGrafico1.textContent = "Porcentaje de energía renovable: " + porcentajeRenovable.toFixed(2) + "%"
    textoGrafico2.textContent = "Porcentaje de energía no renovable: " + porcentajeNoRenovable.toFixed(2) + "%"

    figure.style.display = "flex"
    interno1.style.height = porcentajeRenovable.toFixed(2) + "%"
    interno2.style.height = porcentajeNoRenovable.toFixed(2) + "%"

    barra.value = ""
    barra2.value = ""
})

barra.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        enviar.click()
    }
})
barra2.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        enviar.click()
    }
})


let mostrar = document.querySelector(".mostrar")
let nav = document.querySelector("nav")
let a = document.querySelectorAll("a")

a.forEach(a => {
    a.onclick = () => {
        nav.classList.toggle("activar")
        mostrar.classList.toggle("e")
    }    
});

mostrar.onclick = () => {
    nav.classList.toggle("activar")
    mostrar.classList.toggle("e")
}

//Simulador
let botonSimulador = document.querySelector(".botonSimulador");
let barraPanel = document.getElementById("barra_panel");
let barraSimulador = document.getElementById("barra_simulador");
let textoResultado = document.querySelector(".textoResultado");

botonSimulador.addEventListener("click", () => {
  let panelW = parseFloat(barraPanel.value);
  let consumoMes = parseFloat(barraSimulador.value);

  if (!Number.isFinite(panelW) || !Number.isFinite(consumoMes)) {
    alert("Error: Llene los campos");
    return;
  }

  let panelesKW = panelW / 1000;
  let horasSolaresDia = 4.5;

  let energiaPanelesMes = panelesKW * horasSolaresDia * 30;

  let porcentajeRenovable = (energiaPanelesMes / consumoMes) * 100;
  if (porcentajeRenovable > 100) porcentajeRenovable = 100;

  let ahorroKWh = Math.min(energiaPanelesMes, consumoMes);

  let precioKWh = 900;
  let ahorroDinero = ahorroKWh * precioKWh;

  let totalFactura = consumoMes * precioKWh;

  let pagoConPaneles = totalFactura - ahorroDinero;

  textoResultado.style.display = "block";

  textoResultado.textContent =
    `Tus paneles generarían aproximadamente ${energiaPanelesMes.toFixed(2)} kWh/mes. ` +
    `Esto cubre el ${porcentajeRenovable.toFixed(2)}% de tu consumo mensual ` +
    `y te ahorra ${ahorroKWh.toFixed(2)} kWh al mes, es decir ` +
    `$${ahorroDinero.toLocaleString("es-CO")} pesos ` +
    `de los $${totalFactura.toLocaleString("es-CO")} pesos que tendrías que pagar, ` +
    `teniendo que pagar tan solo $${pagoConPaneles.toLocaleString("es-CO")} pesos, ` +
    `en lugar de $${totalFactura.toLocaleString("es-CO")} pesos.`;

  barraPanel.value = "";
  barraSimulador.value = "";
});


function enter(input) {
  input.addEventListener("keydown", e => e.key === "Enter" && botonSimulador.click());
}
enter(barraPanel);
enter(barraSimulador);