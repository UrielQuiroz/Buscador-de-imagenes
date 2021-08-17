const resultado = document.querySelector('#resultado');
const frm = document.querySelector('#formulario');


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