function juego() {
  return {
    cartas: [
      { color: 'green', girada: false, borrada: false },
      { color: 'red', girada: false, borrada: false },
      { color: 'blue', girada: false, borrada: false },
      { color: 'yellow', girada: false, borrada: false },
      { color: 'green', girada: false, borrada: false },
      { color: 'red', girada: false, borrada: false },
      { color: 'blue', girada: false, borrada: false },
      { color: 'yellow', girada: false, borrada: false }
    ],

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
        if (this.cartasGiradas[0].color == this.cartasGiradas[1].color) {
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