//variables
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

//ejecución de eventos
eventos();
function eventos() {
    formulario.addEventListener('submit', validarFormulario);
}

//funciones
function validarFormulario(e) {
    e.preventDefault();
    //llamamos los datos PAIS, CUIDAD
    const cuidad = document.querySelector('#cuidad').value;
    const pais = document.querySelector('#pais').value;

    if (cuidad.length < 1 || pais.length < 1) {
        mensaje('datos vacios', 'danger');
    } else {
        mensaje('enviando..', 'success');
        consumirAPI(cuidad, pais);

    }
}

//funcion mensaje
function mensaje(mensaje, color) {

    const error = document.querySelector(".error");
    if (!error) {
        const alerta = document.createElement('div');
        alerta.classList.add('alert', `alert-${color}`, 'mt-4', 'py-2', 'text-center', 'error');
        alerta.textContent = mensaje;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 1000)
    }

}

async function consumirAPI(cuidad, pais) {
    //limpiar HTML
    limpiarHTML();

    const apiKey = '90fd868b5669ef757fb24723679e9798';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${apiKey}`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    const sniped = document.createElement('div');
    sniped.classList.add('d-flex','justify-content-center','p-5');
    sniped.innerHTML = `
    <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class ="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    </div>
    `
    resultado.appendChild(sniped)
    setTimeout(() => {
        sniped.remove();
        mostrarHTML(data)
    },1000)

 
 
}

async function mostrarHTML(data) {
    console.log(data)
    if (data.cod === '404') {
        const div = document.createElement('div');
        div.classList.add('card-body');
        div.innerHTML = `
            <h5 class="card-title text-center text-dark">SIN RESULTADOS</h5>
    `
        resultado.appendChild(div)
        return
    }
    const { main: { temp, temp_max, temp_min }, name } = data
    let temp1 = helperCentigrados(temp);
    let temp_max1 = helperCentigrados(temp_max);
    let temp_min1 = helperCentigrados(temp_min);


    const div = document.createElement('div');
    div.classList.add('card-body');
    div.innerHTML = `
    <h5 class="card-title text-center text-dark">${name}</h5>
    <h1 class="text-center card-subtitle mb-2 text-dark">${temp1}°C</h1>
    <h6 class="text-center card-subtitle mb-2 text-muted">${temp_max1}°C max</h6>
    <h6 class="text-center card-subtitle mb-2 text-muted">${temp_min1}°C min</h6>  
    `
    resultado.appendChild(div)
}

function helperCentigrados(valor) {
    valor = valor - 273, 15
    return parseInt(valor);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}