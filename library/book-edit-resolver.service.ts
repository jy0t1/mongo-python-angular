import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from './book.service';
import { Observable } from 'rxjs/internal/observable';
import { Injectable } from '@angular/core';

@Injectable()
export class BookEditResolverService implements Resolve<Book> {
    constructor(private _bookService: BookService) { }
    id: number;
    newBook: Book;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
        this.id = route.params['id']
        return this._bookService.get1Book(this.id);

    }
}
