import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from './book.service';
import { Observable } from 'rxjs/internal/observable';
import { Injectable } from '@angular/core';

@Injectable()
export class BookListResolverService implements Resolve<Book[]> {
    constructor(private _bookService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]>{
        console.log('0202 i am in BookListResolverService=>resolve')
        return this._bookService.getBooks();
    }
}
