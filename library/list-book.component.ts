import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  books: Book[];
  bookToDisplay: Book;
  dataOneBook: any = [];
  filteredBooks: Book[];

  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredBooks = this.filterBooks(value);

  }
  filterBooks(searchString: string) {
    return this.books.filter(book => book.name.toLowerCase().indexOf(searchString.toLowerCase()) !== 1);
  }
   
  constructor(private _router: Router, private _route: ActivatedRoute) {
      this.books = this._route.snapshot.data['bookList']; /** in app.component.ts resolve: { bookList: BookListResolverService } */
     }
  
  ngOnInit() {
  }
  
  
}

