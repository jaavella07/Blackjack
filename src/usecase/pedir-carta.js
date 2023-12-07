

export const pedirCarta = (deck) => {


    if ( !deck || deck.length === 0) {
        throw new Error('No hay cartas en el deck :c');
    }
    const carta = deck.pop();
    return carta;
}