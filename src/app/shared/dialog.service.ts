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
      public dialog: MatDialog
  ) {}
  // openDialog(employee: Employee) {
  //   const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
  //     data: employee
  //   })
  //   const sub = dialogRef.componentInstance.removeEmployee.subscribe()
  //   dialogRef.afterClosed().subscribe();
  // }
}