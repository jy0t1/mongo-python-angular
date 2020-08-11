import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private _route: ActivatedRoute,
    private _bookService: BookService,
    private _router: Router) {
    const id = +this._route.snapshot.paramMap.get['id'];
    this.book = this._route.snapshot.data['bookOne'];
  }

  ngOnInit() {
  }

}


