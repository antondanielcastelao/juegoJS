/**
 * Suma puntos al jugador
 * @param {number} suma 
 */
function sumarPuntos(suma) {

    if (!suma) {
        suma = 1;
    }

    document.getElementById("puntos").innerHTML = parseInt(document.getElementById("puntos").innerHTML) + suma;
}

/**
 * Detecta si el jugador perdió
 * @returns {Boolean}
 */
function detectarDerrota() {
    if (parseInt(document.getElementById("puntos").innerHTML) > 0) {
        return false;
    }
    return true;
}
document.addEventListener('DOMContentLoaded', () => {
    const personaje = document.getElementById('personaje');
    let posicion = 0;
    const velocidad = 30; 

    const actualizarLimites = () => {
        return window.innerWidth - personaje.offsetWidth;
    };

    setTimeout(() => {
        posicion = personaje.offsetLeft;
    }, 100);

    document.addEventListener('keydown', (e) => {
        const maxPosicion = actualizarLimites();
        
        switch(e.key) {
            case 'ArrowLeft':
                posicion = Math.max(0, posicion - velocidad);
                break;
            case 'ArrowRight':
                posicion = Math.min(maxPosicion, posicion + velocidad);
                break;
        }
        
        personaje.style.left = `${posicion}px`;
        console.log(`Posición: ${posicion}px`); 
    });

    window.addEventListener('resize', () => {
        posicion = Math.min(posicion, actualizarLimites());
        personaje.style.left = `${posicion}px`;
    });
});

/**
 * Esta funcion crea aleatoriamente meteoritos en un area especifica de la pantalla
 */
async function spawneaMeteorito() {
    const meteorito = document.createElement('div');
    meteorito.classList.add('meteorito');
    document.getElementById('background').appendChild(meteorito);
    meteorito.style.left = Math.random() * (window.innerWidth - 50) + 'px';

    meteorito.addEventListener('animationend', () => {
        meteorito.remove();
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const personaje = document.getElementById('personaje');
    const fondo = document.getElementById('background');
    const municionDisplay = document.getElementById('municion');
    const paso = 30;
    let posicion = 0;
    let movimiento = null;
    let direccion = null;
    let municion = 10;
    let recargaInterval = null;

    municionDisplay.textContent = municion;

    const calcularLimites = () => {
        const anchoVentana = window.innerWidth;
        return {
            min: anchoVentana * 0.25,
            max: anchoVentana * 0.75 - personaje.offsetWidth
        };
    };

    const actualizarPosicion = () => {
        const limites = calcularLimites();
        if(direccion === 'izq') posicion = Math.max(limites.min, posicion - paso);
        if(direccion === 'der') posicion = Math.min(limites.max, posicion + paso);
        personaje.style.left = `${posicion}px`;
    };

    const recargarMunicion = () => {
        if(municion < 10) {
            municion++;
            municionDisplay.textContent = municion;
        }
        if(municion === 10) clearInterval(recargaInterval);
    };

    const disparar = () => {
        if(municion <= 0) return;
        
        municion--;
        municionDisplay.textContent = municion;
        
        const bala = document.createElement('div');
        bala.id = 'bala';
        const navePos = personaje.getBoundingClientRect();
        bala.style.left = `${navePos.left + personaje.offsetWidth/2 - 20}px`;
        bala.style.top = `${navePos.top - 1}px`;
        fondo.appendChild(bala);

        clearInterval(recargaInterval);
        recargaInterval = setInterval(recargarMunicion, 1000);

        bala.addEventListener('animationend', () => {
            bala.remove();
        });
    };

    window.addEventListener('load', () => {
        const limites = calcularLimites();
        posicion = limites.min + (limites.max - limites.min) / 2;
        personaje.style.left = `${posicion}px`;
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowLeft' && direccion !== 'izq') {
            direccion = 'izq';
            if(!movimiento) movimiento = setInterval(actualizarPosicion, 100);
        }
        if(e.key === 'ArrowRight' && direccion !== 'der') {
            direccion = 'der';
            if(!movimiento) movimiento = setInterval(actualizarPosicion, 100);
        }
        if(e.code === 'Space') {
            disparar();
            e.preventDefault();
        }
    });

    document.addEventListener('keyup', (e) => {
        if((e.key === 'ArrowLeft' && direccion === 'izq') || 
           (e.key === 'ArrowRight' && direccion === 'der')) {
            clearInterval(movimiento);
            movimiento = null;
            direccion = null;
        }
    });

    window.addEventListener('resize', () => {
        const limites = calcularLimites();
        posicion = Math.min(Math.max(posicion, limites.min), limites.max);
        personaje.style.left = `${posicion}px`;
    });
});