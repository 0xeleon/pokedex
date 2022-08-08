import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { PokemonService } from '../services/pokemon.service';
import { detailPokemonInterface } from '../interfaces/ pokemonApi.model';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})
export class DetailPokemonComponent implements OnInit {
  private sub: any;
  private pokemonId : any;
  private urlImage : string;
  public pokemonDetail : detailPokemonInterface;


  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              private pokemonService: PokemonService) { 
    this.urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
    this.pokemonDetail = {
      name : '',
      weight : 0,
      image : '',
      abilities : [],
      load : false
    }
  }

  public goToList() : void {
    this.router.navigate(['/list-pokemon']); 
  }

  ngOnInit(): void {
    // detect params from url
    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.pokemonId = params['pokemonId'];
      if(this.pokemonId){
        // Call to get the details of pokemon api
        this.pokemonService.getPokemonDetails(this.pokemonId).subscribe(data => {
          if(data){
            this.pokemonDetail.name = data.name;
            this.pokemonDetail.weight = data.weight;
            this.pokemonDetail.image = `${this.urlImage}${this.pokemonId}.png`;
            this.pokemonDetail.abilities = data.abilities.map((item:any) => item.ability.name);
            this.pokemonDetail.load = true;
          }
        })
      }else{
        this.router.navigate(['/list-pokemon']);
      }
    });
  }
}
