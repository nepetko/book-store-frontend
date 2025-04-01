import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-books-overview',
  imports: [MatPaginatorModule, CurrencyPipe, NgStyle],
  templateUrl: './books-overview.component.html',
  styleUrl: './books-overview.component.css'
})
export class BooksOverviewComponent {
  books: Book[] = [];
  paginatedBooks: Book[] = [];
  readonly myPageSize = 15;
  selectedBook: Book | null = null;

  constructor(private bookService: BookService, private router: Router, private dialog: MatDialog) { }

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

  onAddBook() {
    this.router.navigate(['/add-book']);
  }

  onEditBook() {
    if (this.selectedBook) {
      this.router.navigate(['/add-book'], {
        queryParams: {
          id: this.selectedBook.id
        }
      }
      );
    }
    else {
      alert('No book selected for editing');
    }
  }

  onDeleteBook() {
    if (this.selectedBook) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        disableClose: true,
        position: { top: '5%' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.bookService.deleteBook(this.selectedBook?.id);

          this.books = this.books.filter(book => book.id !== this.selectedBook?.id);
          this.paginatedBooks = this.books.slice(0, this.myPageSize);
          this.selectedBook = null;
        }
      });
    } else {
      alert('No book selected for deletion');
    }
  }
  isSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  onSelectBook(book: Book) {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    }
    else {
      this.selectedBook = book;
    }
  }

  isFeatured(book: Book): boolean {
    return book.title.endsWith("5");
  }
}
