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