import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { DeleteEmployeeFromDb } from '../ngxs-store/employee-list.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {

  employeeList$: Observable<any>
  isEmployeeSelectedForDeletion: boolean = false
  @Input() employeeToDelete: Employee[] = []
  @Output() removeEmployee = new EventEmitter<Employee>();

  constructor(
      private dialog: MatDialogRef<ConfirmDeleteComponent>,
      private store: Store,
      @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employeeList$ =
        this.store.select(state => state.employeeList.employeeList)
  }

  handoverEmployee(employee: Employee): void {
    this.dialog.close(employee)
  }

  deleteForGood(employee: Employee): void {
    this.store.dispatch(new DeleteEmployeeFromDb(employee))
    this.handoverEmployee(employee)
  }

}