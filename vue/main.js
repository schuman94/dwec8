Vue.component('Presentacion', {
    data() {
        return {saludo: 'Hola, soy Desiré, te saludo desde un componente!'}
    },
    template:`
        <div>
            <span>{{saludo}}</span>
        </div>`
})

const app = new Vue({
    el: '#app',
    data: {
      saludo: 'Hola, soy nuevo por aquí',
      mostrado: false
    },
    methods: {
        mostrar() {
            this.mostrado = !this.mostrado
        }
    }
})