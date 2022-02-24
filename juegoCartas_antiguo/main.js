function juego() {
    return  { cartas: [
      { color: 'red', girada: false, borrada: false },
      { color: 'blue', girada: false, borrada: false },
      { color: 'green', girada: false, borrada: false },
      { color: 'yellow', girada: false, borrada: false },
      { color: 'red', girada: false, borrada: false },
      { color: 'blue', girada: false, borrada: false },
      { color: 'green', girada: false, borrada: false },
      { color: 'yellow', girada: false, borrada: false }
    ],
    get cartasGiradas() {
      return this.cartas.filter(carta => carta.girada)
    },
    get cartasBorradas() {
      return this.cartas.filter(carta => carta.borrada)
    },
    get puntos() {
      return this.cartasBorradas.length;
    },
    girarCarta(carta) {
      if (this.cartasGiradas.length == 2) {
        return
      }
      carta.girada = !carta.girada

      if (this.cartasGiradas.length == 2) {
        if (this.cartasGiradas[0].color == this.cartasGiradas[1].color) {
          lanzaParejaEncontrada('Has encontrado un pareja');
          setTimeout(() => {
            this.cartasGiradas.forEach(carta => carta.borrada = true);
            if(this.puntos == this.cartas.length) {
              alert('Enhorabuena, has ganado');
            }
          }, 750);
        }
        setTimeout(() => {
          this.cartasGiradas.forEach(carta => carta.girada = false);
        }, 750);
      }
      console.log(this.cartasGiradas)
    }}
  }

  function lanzaParejaEncontrada(miMensaje) {
    let miEvento = new CustomEvent('parejaencontrada', { detail: {mensaje: miMensaje}});
    window.dispatchEvent(miEvento)
  }