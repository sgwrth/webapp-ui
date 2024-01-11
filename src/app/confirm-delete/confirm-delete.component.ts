import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  constructor(
      private emplServ: EmployeeService,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}
  isEmployeeSelectedForDeletion: boolean = false
  @Input() employeeToDelete: Employee[] = []
  @Output() removeEmployee = new EventEmitter<Employee>();
  deleteForGood(employee: Employee): void {
    this.emplServ.deleteEmployee(employee)
        .subscribe()
    for (let empl of this.employeeToDelete) {
      this.removeEmployee.emit(empl)
    }
    this.employeeToDelete.pop()
  }
}