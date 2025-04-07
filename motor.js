document.addEventListener('DOMContentLoaded', () => {
    const personaje = document.getElementById('personaje');
    let posicion = 0;
    const velocidad = 20;
    const maxPosicion = window.innerWidth - personaje.offsetWidth;

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                posicion = Math.max(0, posicion - velocidad);
                break;
            case 'ArrowRight':
                posicion = Math.min(maxPosicion, posicion + velocidad);
                break;
        }
        personaje.style.left = `${posicion}px`;
    });
});