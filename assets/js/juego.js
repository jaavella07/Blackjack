/* 
2C=TREBOLES
2D=DIAMANTES
2H=CORAZONES
2S=ESPADAS
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosMaquina = 0;


//Referencias

const btnPedir = document.querySelector('#btnPedir')
const divCartasJugador = document.querySelector('#jugador-cartas');
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
    
    console.log(deck)

}

crearDeck();

//Pedir Carta

const pedirCarta = () => {

    
    if (deck.length === 0) {
        throw 'No hay mas Cartas'
    }

    let carta = deck.pop();
    
    console.log(deck)
    console.log(carta)

    return carta
}

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1

    }
    
    const valorC = valorCarta( pedirCarta() );
    console.log({valorC})


// Eventos 

btnPedir.addEventListener('click',()=> {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;


    const imgCarta = document.createElement('img');
    imgCarta.src= `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carts__img')
    divCartasJugador.append(imgCarta)

    if(puntosJugador > 21 ){
        console.log('perdio')
        btnPedir.disabled= true;
    }else if( puntosJugador === 21 ){
        console.log('21, Genial!')
        btnPedir.disabled= true;
    }

})
