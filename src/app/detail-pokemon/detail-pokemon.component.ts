import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PokemonService } from '../services/pokemon.service';
import { PaginationService, Page } from '../services/pagination.service'
import { detailPokemonInterface } from '../interfaces/ pokemonApi.model';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})

export class DetailPokemonComponent implements OnInit, OnDestroy {
  private sub: any;
  private pokemonId : any;
  private urlImage : string;
  public pokemonDetail : detailPokemonInterface;
  public numberPokemon$ : Subscription;
  public onDestroy$ : Subject<boolean> = new Subject()

  constructor(private router:Router,
              private pokemonService: PokemonService,
              paginationService : PaginationService) { 

    this.urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
    this.pokemonDetail = {
      name : '',
      weight : 0,
      image : '',
      abilities : [],
      load : false
    }
    
    /** Example variable without subscribe IMPORTANT the variable must be  Observable<PokemonSelected>;
     * this.numberPokemon$ = pokemonService.sharingObservablePokemonSelected;
    */

    this.numberPokemon$ = pokemonService.sharingObservablePokemonSelected
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
      (data) => {
        console.log('number pokemon', data)
        this.pokemonId = data.pokemonId;
      }
    );
  }

  public goToList() : void {
    this.router.navigate(['/list-pokemon']); 
  }

  ngOnInit(): void {
    if(this.pokemonId){
      this.pokemonService.getPokemonDetails(this.pokemonId).subscribe(data => {
        if(data){
          this.pokemonDetail = {
            name : data.name,
            weight : data.weight,
            image : `${this.urlImage}${this.pokemonId}.png`,
            abilities : data.abilities.map((item:any) => item.ability.name),
            load : true 
          }
        }
      });
    }else {
      this.router.navigate(['/list-pokemon']);
    }
  }
  
  ngOnDestroy(){
    this.onDestroy$.next(true);
  }
}
