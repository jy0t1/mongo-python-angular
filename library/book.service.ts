import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()

export class BookService {
  book: Book;
  serverURL = 'http://127.0.0.1:5000/books/';
  constructor(private httpClient: HttpClient) { }

  private listBooks: Book[] = [
    {
      id: 1,
      name: "First In Line123",
      author: "Dont Know",
      published: new Date('11/24/2010'),
      pages: 123,
      publisher: "Amazon",
      isAvailable: true,
      category: "Action",
      bindType: "Hard Cover",
      photoPath: 'assets/images/firstinline.jpg'
    },
    {
      id: 2,
      name: "Team Five123",
      author: "Mr Beam",
      published: new Date('05/21/1980'),
      pages: 235,
      publisher: "Sarkar Publication",
      isAvailable: true,
      category: "Horror",
      bindType: "Soft Cover",
      photoPath: 'assets/images/team5.jpg'
    },
    {
      id: 3,
      name: "First Women123",
      author: "Mr Writer",
      published: new Date('11/09/2000'),
      pages: 711,
      publisher: "The Publication",
      isAvailable: true,
      category: "Social",
      bindType: "Book Bind",
      photoPath: 'assets/images/firstwomen.jpg'
    }
  ]

  // GET all books
  getBooks(): Observable<Book[]> {
    console.log('i am in book.service.ts => getBooks')
    return this.httpClient.get<Book[]>('http://127.0.0.1:5000/books').pipe(retry(1), catchError(this.errHandle));
  }

  getOneBook(id: number): Observable<Book[]> {
    // Not in use 
    return this.httpClient.get<Book[]>('http://127.0.0.1:5000/books/Voro');
  }

  // GET a book
  get1Book(id: number): Observable<Book> {
    return this.httpClient.get<Book>('http://127.0.0.1:5000/books/' + id.toString()).pipe(retry(1), catchError(this.errHandle));
  }

  // POST add a book
  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>('http://localhost:5000/books/create', book, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(retry(1), catchError(this.errHandle))
  }

  // PUT edit a book
  updateBook(book: Book, id: number): Observable<Book> {
    console.log('i am in book.service.ts => updateBook ' + id)
    return this.httpClient.put<Book>('http://localhost:5000/books/update/' + id.toString(), book, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(retry(1), catchError(this.errHandle))
  }

  // DELETE a book - why noy working?????? ERROR TypeError: Cannot read property 'deleteBook' of undefined
  //('/books/delete/<bookid>', methods=['DELETE'])

  deleteBook(id: number): Observable<void> {
    console.log('i am in book.service.ts => deleteBook ' + id)
    return this.httpClient.delete<void>(this.serverURL + 'delete/' + id.toString()).pipe(catchError(this.errHandle));
  }

  delete_Book(id: number) {
    console.log('i am in book.service.ts => deleteBook ' + id)
  }

  // Error handling
  errHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

} 