const resultado = document.querySelector('#resultado');
const frm = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;


window.onload = () => {
    frm.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de busqueda');
        return;
    }

    buscarImagenes();
}


//Generador que va a registrar la cantidad de elementos de acuerdo a las paginas 
function *crearPaginador(total) {
    console.log(total);
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}


function calcularPaginas(total) {
    return parseInt(Math.ceil( total / registrosPorPagina ));
}


function mostrarAlerta(msj) {

    const existeAlerta = document.querySelector('.msjAlert');

    if(!existeAlerta) {

        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
                                'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'msjAlert');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <pan class="block sm:inline">${msj}</span>
        `;
    
        frm.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }
}

async function buscarImagenes() {
    const termino = document.querySelector('#termino').value;
    const key = '22967234-ada95738245f23425f4cfe247';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    // fetch(url)
    //     .then( rpta => rpta.json() )
    //     .then ( result => {
    //         totalPaginas = calcularPaginas(result.totalHits);
    //         console.log(totalPaginas);
    //         mostrarImagenes(result.hits);
    //     })

    try {
        const rpta = await fetch(url);
        const result = await rpta.json();
        totalPaginas = calcularPaginas(result.totalHits);
        mostrarImagenes(result.hits);
    } catch (error) {
        console.log(error);
    }
}


function mostrarImagenes(imagenes) {
    console.log(imagenes);

    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    //Iterar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach( img => {
        const { previewURL, likes, views, largeImageURL } = img;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}" >
                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light">Me gusta </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light">Veces vista </span> </p>
                    </div>

                    <div class="p-3">
                        <a  class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded p-1"
                            href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                            Ver imagen
                        </a>
                    </div>

                </div>
            </div>
        `;
    });


    //Limpiar el paginador previo
    while(paginacionDiv.firstChild) {
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    //Generamos el nuevo paginador
    imprimirPaginador();
}

function imprimirPaginador() {

    iterador = crearPaginador(totalPaginas);

    while(true) {
        const { value, done } = iterador.next();
        if(done) return;

        //Caso contrario, genera un botón por cada elemento el generador
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');
        
        boton.onclick = () => {
            paginaActual = value;
            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }
}