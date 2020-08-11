import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from './book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {
  private selectedBookID: number;
  @Input() book: Book;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  books: Book;
  private _bookService: BookService;
  n: number

  constructor(private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedBookID = +this._route.snapshot.paramMap.get('id');
    console.log('0101 i am in display book component ngOnInit ' + this.selectedBookID)
    // need to check what is happening here
    //this._bookService.getBooks().subscribe((data: Book) => this.books = data, console.error());

  }

  getId(): string {
    return 'Book ID is ' + this.book.id;
  }
  // Click event to go to detail view
  onClick(bookID: number) {
    this._router.navigate(['/list', bookID])
  }

  // Click event to go to detail view
  viewBook() {
    this._router.navigate(['/list', this.book.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    })
  }

  // Edit a book
  editBook() {
    this._router.navigate(['/edit', this.book.id]);
  }

  // Delete a book - ('/books/delete/<bookid>', methods=['DELETE'])
  // DELETE a book - why noy working?????? ERROR TypeError: Cannot read property 'deleteBook' of undefined
  
   delBook() {
     if (confirm('Are you want to delete BookID ' + this.book.id + '?')) {
       console.log('9999 i am in DisplayBookComponent=>delBook()=> confirm ' + this.book.id)
        this._bookService.deleteBook(this.book.id).subscribe(
         () => console.log('Book ID ${this.book.id} deleted'), (err) => console.log(err));
     }
     this.notifyDelete.emit(this.book.id);
     console.log('8888 i am in DisplayBookComponent=>deleteBook() after delete service ' + this.book.id)
     //this._router.navigate(['list']);
   }
   
  del_Book() {
    if (confirm('Are you want to delete BookID ' + this.book.id + '?')) {
      console.log('9009 i am in DisplayBookComponent=>delBook()=> confirm ' + this.book.id)
      this._bookService.delete_Book(this.book.id);
    }
  }
}
