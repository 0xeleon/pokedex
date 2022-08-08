import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/';
  
  constructor(private httpClient: HttpClient) { }

  getPokemonList(limit : number, offset : number) :Observable<any>{
    return this.httpClient.get(`${this.url}pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(idPokemon : number) : Observable<any>{
    return this.httpClient.get(`${this.url}pokemon/${idPokemon}/`);
  }

}
