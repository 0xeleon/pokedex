import { Component, OnInit, ViewChild } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { PokemonService } from '../services/pokemon.service';

import { PokemonResponseInterface, PokemonResultsInterface } from '../interfaces/ pokemonApi.model'

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})


export class ListPokemonComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'url'];
  public dataPokemon : PokemonResultsInterface[] = [];
  private page : number = 0;
  public limitPage : number = 10; 
  public totalPages : number = 0;
  public loading : boolean = false;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    // get list of items
    this.getData()
  }

  public eventPageChanged(event: any){
    if(event.pageIndex > 0){
      this.page = this.limitPage * event.pageIndex;
    }else{
      this.page = 0;
    }
    this.getData()
  }


  public goDetail(detail: PokemonResultsInterface){
    let url = detail.url.split('/');
    let pokemonId = url[url.length - 2];
    // go to detail and pass params in url
    this.router.navigate(['/detail-pokemon'], {queryParams: {pokemonId : pokemonId}});
  }

  public getData(){
    this.loading = true;
    this.pokemonService.getPokemonList(this.limitPage, this.page).subscribe((data: PokemonResponseInterface) => {
      if(data.results){
        this.dataPokemon = data.results;
      }
      if(this.totalPages === 0){
        this.totalPages = data.count;
      }
      this.loading = false;
    })
  }
}
