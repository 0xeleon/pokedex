import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';

const routes: Routes = [
  { path : 'list-pokemon', title: 'List Pokemon', component : ListPokemonComponent },
  { path : 'detail-pokemon', title: 'Detail Pokemon', component : DetailPokemonComponent },
  { path: '',   redirectTo: '/list-pokemon', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
