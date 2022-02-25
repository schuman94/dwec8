function juego() {
  return {
    cartas: crearBaraja() /* [
      { color: 'green', girada: false, borrada: false, numero: 1 },
      { color: 'red', girada: false, borrada: false, numero: 1 },
      { color: 'blue', girada: false, borrada: false, numero: 1 },
      { color: 'yellow', girada: false, borrada: false, numero: 1 },
      { color: 'green', girada: false, borrada: false, numero: 1 },
      { color: 'red', girada: false, borrada: false, numero: 1 },
      { color: 'blue', girada: false, borrada: false, numero: 1 },
      { color: 'yellow', girada: false, borrada: false, numero: 1 },

      { color: 'green', girada: false, borrada: false, numero: 2 },
      { color: 'red', girada: false, borrada: false, numero: 2 },
      { color: 'blue', girada: false, borrada: false, numero: 2 },
      { color: 'yellow', girada: false, borrada: false, numero: 2 },
      { color: 'green', girada: false, borrada: false, numero: 2 },
      { color: 'red', girada: false, borrada: false, numero: 2 },
      { color: 'blue', girada: false, borrada: false, numero: 2 },
      { color: 'yellow', girada: false, borrada: false, numero: 2 },

      { color: 'green', girada: false, borrada: false, numero: 3 },
      { color: 'red', girada: false, borrada: false, numero: 3 },
      { color: 'blue', girada: false, borrada: false, numero: 3 },
      { color: 'yellow', girada: false, borrada: false, numero: 3 },
      { color: 'green', girada: false, borrada: false, numero: 3 },
      { color: 'red', girada: false, borrada: false, numero: 3 },
      { color: 'blue', girada: false, borrada: false, numero: 3 },
      { color: 'yellow', girada: false, borrada: false, numero: 3 },

      { color: 'green', girada: false, borrada: false, numero: 4 },
      { color: 'red', girada: false, borrada: false, numero: 4 },
      { color: 'blue', girada: false, borrada: false, numero: 4 },
      { color: 'yellow', girada: false, borrada: false, numero: 4 },
      { color: 'green', girada: false, borrada: false, numero: 4 },
      { color: 'red', girada: false, borrada: false, numero: 4 },
      { color: 'blue', girada: false, borrada: false, numero: 4 },
      { color: 'yellow', girada: false, borrada: false, numero: 4 }
    ] */,

    iniciado: false,

    puntuacion: 0,

    iniciar() {
      this.barajar();
      this.iniciado = true;
      this.cartas.forEach(carta => carta.girada = true);
      setTimeout(() => this.cartas.forEach(carta => carta.girada = false), 2000);
    },

    get cartasGiradas() {
      return this.cartas.filter(carta => carta.girada)
    },

    get cartasBorradas() {
      return this.cartas.filter(carta => carta.borrada)
    },

    get puntos() {
      return this.puntuacion;
    },

    sumarPuntos() {
      this.puntuacion = this.puntuacion + 20;
    },

    restarPuntos() {
      this.puntuacion = this.puntuacion - 1;
    },

    girarCarta(carta) {
      if (this.cartasGiradas.length == 2 || this.cartasGiradas.length == this.cartas.length) {
        return
      }

      carta.girada = !carta.girada;
      if (this.cartasGiradas.length == 2) {
        setTimeout(() => { 
        if (this.cartasGiradas[0].color == this.cartasGiradas[1].color
          && this.cartasGiradas[0].numero == this.cartasGiradas[1].numero) {
            lanzaparejaencontrada('Pareja encontrada');
            this.sumarPuntos();
            this.cartasGiradas.forEach(carta => carta.borrada  = true);
            if (this.cartasBorradas.length == this.cartas.length) {
              setTimeout(() => {
                alert('Enhorabuena has ganado');
                this.reiniciar();
                this.iniciado = false;
              }, 250);
            }
          console.log(this.cartasGiradas);
        } else {
          lanzaparejaincorrecta('Pareja no encontrada');
          this.restarPuntos();
        }
        this.cartasGiradas.forEach(carta => carta.girada = false)
        } , 750);
      }
    },
    
    reiniciar() {
      this.cartasGiradas.forEach(carta => carta.girada = false);
      this.cartasBorradas.forEach(carta => carta.borrada = false);
      this.puntuacion = 0;
      this.iniciar(); // Es redundante, pero por si acaso
    },

    barajar() {
      this.cartas.sort(()=> Math.random() - 0.5);
    }
  }
}

function lanzaparejaencontrada(mensaje) {
  let event = new CustomEvent ('parejaencontrada', {detail: {mensaje: mensaje}});

  window.dispatchEvent(event);
}

function lanzaparejaincorrecta(mensaje) {
  let event = new CustomEvent ('parejaincorrecta', {detail: {mensaje: mensaje}});

  window.dispatchEvent(event);
}

// Esta funcion no pertenece a juego, pero sirve para ahorrar escribir manualmente la baraja.
function crearBaraja() {
  let colores = ['green','red', 'blue', 'yellow'];
  let numeros = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
  let cartas = [];
  for (let i = 0; i < 32; i++) {
    cartas.push({color: colores[0], girada: false, borrada: false, numero: numeros[0]})
    colores.push(colores[0]);
    colores.splice(0, 1);
    numeros.push(numeros[0]);
    numeros.splice(0, 1);
  }
  return cartas;
}