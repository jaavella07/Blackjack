/* 
2C=TREBOLES
2D=DIAMANTES
2H=CORAZONES
2S=ESPADAS
*/
(() => {

    'use strinct'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0;
    let puntosComputadora = 0;


    //Referencias

    const btnPedir = document.querySelector('#btnPedir')
    const btnDetener = document.querySelector('#btnDetener')
    const btnNuevo = document.querySelector('#btnNuevo')


    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHTML = document.querySelectorAll('small');


    //New Deck
    const crearDeck = () => {
        for (let i = 2; i < 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }


        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        //console.log(deck)

    }

    crearDeck();

    //Pedir Carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const carta = deck.pop();
        return carta;
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1

    }
    // Valor Computadora 

    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;


            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carts__img')
            divCartasComputadora.append(imgCarta)

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gana')
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana!')
            } else {
                alert('Computadora Gana!')

            }

        }, 200);

    }



    // Eventos 

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;


        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carts__img')
        divCartasJugador.append(imgCarta)

        if (puntosJugador > 21) {
            console.log('perdio')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            btnNuevo.disabled = false;
            turnoComputadora(puntosJugador)

        } else if (puntosJugador === 21) {
            console.log('21, Genial!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            btnNuevo.disabled = false;
            turnoComputadora(puntosJugador)

        }


    })


    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    })

    btnNuevo.addEventListener('click', () => {

        deck = [];
        deck = crearDeck();
        puntosComputadora = 0;
        puntosJugador = 0;

        puntosHTML[1].innerText = 0;
        puntosHTML[0].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    })
})();

