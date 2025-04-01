import { Component } from '@angular/core';
import { SidebarComponent } from "./views/sidebar/sidebar.component";
import { BooksOverviewComponent } from "./views/books-overview/books-overview.component";

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, BooksOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-store-frontend';
}
