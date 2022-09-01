import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Page {
  page: number;
  offset: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  // Subject :
  // BehaviorSubject : Vamos a tener un objeto inicial o lo ultimo que se ha emitiado
  // private sharingObservablePrivate$ : BehaviorSubject<Page> = new BehaviorSubject<Page>({page: 0});

  private sharingObservablePrivate$: BehaviorSubject<Page> =
    new BehaviorSubject<Page>({ page: 0, offset: 0 });

  get sharingObservable() {
    // retorno mi observable pero es importante que use asObservable , para que solo se puedan SUBSCRIBIR o ESCUCHAR
    return this.sharingObservablePrivate$.asObservable();
  }

  set sharingObservableData(data: Page) {
    // next emitir un nuevo valor para mi observable
    this.sharingObservablePrivate$.next(data);
  }
}
