import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  constructor(private emplServ: EmployeeService) {}
  isEmployeeSelectedForDeletion: boolean = false
  @Input() employeeToDelete: Employee[] = []
  @Output() removeEmployee = new EventEmitter<Employee>();
  // deleteForGood(employee: Employee): void {
    // this.confirmDelete.emit(employee)
    // this.isEmployeeSelectedForDeletion = false
  // }
  deleteForGood(employee: Employee): void {
    this.emplServ.deleteEmployee(employee)
        .subscribe()
    for (let empl of this.employeeToDelete) {
      this.removeEmployee.emit(empl)
    }
  }
}