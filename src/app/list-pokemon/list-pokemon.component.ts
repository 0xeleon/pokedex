import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

import { PokemonService } from '../services/pokemon.service';
import { PaginationService, Page } from '../services/pagination.service';

import {
  PokemonResponseInterface,
  PokemonResultsInterface,
} from '../interfaces/ pokemonApi.model';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css'],
})
export class ListPokemonComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'url'];
  public dataPokemon: PokemonResultsInterface[] = [];
  public limitPage: number = 10;
  public totalPages: number = 0;
  public loading: boolean = false;

  subscription$: Subscription;
  infoPage: Page = { page: 0, offset: 0 };
  // best way to unsubscribed to observable is
  // Declarate observable
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private paginationService: PaginationService
  ) {
    /* this.data$ = paginationService.sharingObservable;
      first method 
      this.subscription$ = paginationService.sharingObservable.subscribe(
        (pageToSet) => {
          this.pageToSet = pageToSet 
        }
      );*/
    // Second method
    this.subscription$ = paginationService.sharingObservable
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.infoPage = data;
      });
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    // get list of items
    this.getData();
  }

  ngOnDestroy() {
    /* CLOSE SUBSCRIPTION
     * FIRS METHOD
     * this.subscription$.unsubscribe();
     * SECOND METHOD */
    this.onDestroy$.next(true);
  }

  public eventPageChanged(event: any) {
    if (event.pageIndex > 0) {
      this.paginationService.sharingObservableData = {
        page: event.pageIndex,
        offset: this.limitPage * event.pageIndex,
      };
    } else {
      this.paginationService.sharingObservableData = {
        page: 0,
        offset: 0,
      };
    }
    this.getData();
  }

  public goDetail(detail: PokemonResultsInterface) {
    let url = detail.url.split('/');
    let pokemonId = url[url.length - 2];

    this.pokemonService.sharingObservablePokemonSelectedData = {
      pokemonId: Number(pokemonId),
    };
    let page = Math.floor(Number(pokemonId) / this.limitPage) - 1;
    this.paginationService.sharingObservableData = {
      page: page,
      offset: this.infoPage.offset,
    };

    // go to detail and pass params in url
    this.router.navigate(['/detail-pokemon']);
  }

  public getData() {
    this.loading = true;
    this.pokemonService
      .getPokemonList(this.limitPage, this.infoPage.offset)
      .subscribe((data: PokemonResponseInterface) => {
        if (data.results) this.dataPokemon = data.results;
        if (this.totalPages === 0) this.totalPages = data.count;
        this.loading = false;
      });
  }
}
