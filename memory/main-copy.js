document.addEventListener('alpine:init', () => {
  Alpine.data('juego', () => ({
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
      carta.girada = !carta.girada;
      if (this.cartasGiradas.length == 2) {

        if (this.cartasGiradas[0].color == this.cartasGiradas[1].color) {
          this.cartasGiradas.forEach(carta => carta.borrada = true);
          if (this.cartasBorradas.length == this.cartas.length) {
            alert('Enhorabuena has ganado')
          }
          console.log(this.cartasGiradas);
        };
        
        setTimeout(() => this.cartasGiradas.forEach(carta => carta.girada = false), 750);

      }
    }
  }))
});
