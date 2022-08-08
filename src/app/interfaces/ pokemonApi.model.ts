export interface PokemonResponseInterface {
    count : number,
    next : string,
    previous : string,
    results : [PokemonResultsInterface]
}

export interface PokemonResultsInterface {
    name : string,
    url : string
}

export interface testInterface {
    name : string,
    url : string
}