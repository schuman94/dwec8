document.addEventListener('alpine:init', () => {
  Alpine.data('juego', () => ({
    cartas: [
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
      carta.girada = !carta.girada

      if (this.cartasGiradas.length == 2) {
        if (this.cartasGiradas[0].color == this.cartasGiradas[1].color) {
          setTimeout(() => {
            this.cartasGiradas.forEach(carta => carta.borrada = true);
            if(this.puntos == this.cartas.length) {
              alert('Enhorabuena, has ganado');
            }
          }, 750)
        }
        setTimeout(() => {
          this.cartasGiradas.forEach(carta => carta.girada = false);
        }, 750)
      }

      console.log(this.cartasGiradas)
    }
  }))
})

