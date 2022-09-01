import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PokemonSelected {
  pokemonId : number | null
}
@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/';
  private sharingObservablePokemon$ : BehaviorSubject<PokemonSelected> = new BehaviorSubject<PokemonSelected>({pokemonId : null});

  constructor(private httpClient: HttpClient) { }

  getPokemonList(limit : number, offset : number) :Observable<any>{
    return this.httpClient.get(`${this.url}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(map(res => {
        return res
      }))
  }

  getPokemonDetails(idPokemon : number) : Observable<any>{
    return this.httpClient.get(`${this.url}pokemon/${idPokemon}/`);
  }

  get sharingObservablePokemonSelected(){
    return this.sharingObservablePokemon$.asObservable();
  }

  set sharingObservablePokemonSelectedData(data : PokemonSelected){
    this.sharingObservablePokemon$.next(data);
  }
}
