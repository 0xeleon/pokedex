import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2/';
  
  constructor(private httpClient: HttpClient) { }

  getPokemonList() :Observable<any>{
    let limit = 10;
    let offset = 0;
    return this.httpClient.get(`${this.url}pokemon?limit=${limit}&offset=${offset}`);
  }
}
