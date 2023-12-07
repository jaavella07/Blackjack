
/**
 * 
 * @param {Array<string>} tiposDeCartas 
 * @param {Array<string>} tiposEspeciales 
 * @returns{ Array } 
 */



// Modulo crea un nuevo deck
export const crearDeck = ( tiposDeCartas, tiposEspeciales) => {

    if( !tiposDeCartas || tiposDeCartas.length === 0 )
     throw new Error ('Tipo de Cartas Obligatorio cmo un arreglo de String')
    
    let deck = [];  

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tiposDeCartas ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tiposDeCartas ) {
        for( let esp of tiposEspeciales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}