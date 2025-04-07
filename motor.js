function sumarPuntos(suma) {

    if (!suma) {
        suma = 1;
    }

    document.getElementById("puntos").innerHTML = parseInt(document.getElementById("puntos").innerHTML) + suma;
}

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