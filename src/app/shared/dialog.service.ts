import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
      private dialog: MatDialog
  ) {}
  openDialog(employee: Employee): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: employee
    })
    return dialogRef.afterClosed()
  }
}