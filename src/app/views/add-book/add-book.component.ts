import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  bookForm: FormGroup;
  showError: boolean = false;
  titleOfForm: string = "Add a New Book";
  bookForEditting: Book | undefined;
  isInEditMode: boolean = false;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute, private toaststr: ToastrService) {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl(''),
      genre: new FormControl(''),
      price: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const bookId = params['id'];
      if (bookId) {
        this.bookService.getBookById(bookId).subscribe(
          (data: Book) => {
            this.bookForEditting = data;
            this.prepopulateForm();
            this.isInEditMode = true;
            this.titleOfForm = "Edit book";
          },
          (error) => {
            console.error('Error fetching book details:', error);
          }
        );
      }
    });
  }

  prepopulateForm() {
    if (this.bookForEditting) {
      this.titleOfForm = "Edit Book";
      this.isInEditMode = true;
      this.bookForm.patchValue({
        title: this.bookForEditting.title,
        author: this.bookForEditting.author,
        genre: this.bookForEditting.genre,
        price: this.bookForEditting.price
      });
    }
  }


  get title() {
    return this.bookForm.get("title");
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.submitValidForm();
    } else {
      this.failWithInvalidForm();
    }
  }

  submitValidForm() {
    const newBook = this.generateBookFromForm();

    if (this.bookForEditting) {
      newBook.id = this.bookForEditting.id;
      newBook.createdAt = new Date().toISOString();
      this.bookService.putBook(newBook);
      this.toaststr.success("Book editted");
    }
    else {
      const isValid = this.bookService.addBook(newBook);
      isValid.subscribe(success => {
        if (success) {
          this.toaststr.success("Book saved");
        } else {
          this.toaststr.error("Backend failed! Operation not executed!");
        }
      });
    }

    this.router.navigate(['/books-overview']);
  }


  failWithInvalidForm() {
    this.showError = true;
    this.bookForm.setErrors({
      invalidBookFormError: true
    })
    this.toaststr.error("There are validation errors");
  }

  generateBookFromForm(): Book {
    return new Book(
      uuidv4(),
      this.bookForm.value.title,
      this.bookForm.value.author,
      this.bookForm.value.genre,
      this.bookForm.value.price,
      new Date().toISOString()
    );
  }

  closeError() {
    this.showError = false;
  }

  goBack() {
    this.router.navigate(['/books-overview']);
  }
}
