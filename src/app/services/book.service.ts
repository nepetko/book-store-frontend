import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const bookAsJson = JSON.stringify(book);
    return this.http.post<Book>(this.apiUrl, bookAsJson, { headers }).pipe(
      map(response => {
        return true;
      }),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }


  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }


  putBook(book: Book) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const bookAsJson = JSON.stringify(book);
    this.http.put<Book>(`${this.apiUrl}/${book.id}`, bookAsJson, { headers }).subscribe({
      next: (response) => {
        console.log('Book put successfully:', response);
      },
      error: (error) => {
        console.error('Error creating book:', error);
      },
      complete: () => {
        console.log("compl");
      }
    });
  }

  deleteBook(bookId: string | undefined) {
    this.http.delete<Book>(`${this.apiUrl}/${bookId}`,).subscribe({
      next: (response) => {
        console.log('Book deleted successfully:', response);
      },
      error: (error) => {
        console.error('Error creadeleting book:', error);
      },
      complete: () => {
        console.log("compl");
      }
    });
  }
}
