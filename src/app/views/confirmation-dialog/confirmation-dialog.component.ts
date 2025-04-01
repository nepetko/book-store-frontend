import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule],
  template: `
  <div my-dialog>
    <h2>Confirm Delete</h2>
    Are you sure you want to delete this book?
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </div>
    </div>
  `,
  styles: [`
    h2 {      
      font-size: 20px;
      margin-bottom: 10px;
    }
    div[my-dialog] {      
      padding: 5px;
    }
    div[mat-dialog-actions]{
      justify-content: flex-end;
    }
    button {
      font-weight: bold;      
      margin-left: 10px;

    }
  `]
})
export class ConfirmationDialogComponent {

}
