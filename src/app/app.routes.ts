import { Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { BooksOverviewComponent } from './views/books-overview/books-overview.component';
import { AddBookComponent } from './views/add-book/add-book.component';

export const routes: Routes = [
    {
        path: '',
        component: BooksOverviewComponent,
        title: 'Home Page'
    },
    {
        path: 'authors',
        component: AuthorsComponent,
        title: 'Authors'
    },
    {
        path: 'add-book',
        component: AddBookComponent,
        title: 'Authors'
    },
    {
        path: 'books-overview',
        component: BooksOverviewComponent,
        title: 'Books Overview'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About Page'
    }
];
