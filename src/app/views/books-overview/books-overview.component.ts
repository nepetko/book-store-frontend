import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-overview',
  imports: [MatPaginatorModule],
  templateUrl: './books-overview.component.html',
  styleUrl: './books-overview.component.css'
})
export class BooksOverviewComponent {
  books: Book[] = [];
  paginatedBooks: Book[] = [];
  readonly myPageSize = 15;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.books.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.paginatedBooks = this.books.slice(0, this.myPageSize);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }
}
