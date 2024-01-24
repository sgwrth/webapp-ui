import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { EmployeeService } from '../shared/employee.service';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddEmployeeToList } from '../ngxs-store/employee-list.actions';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  employee: Employee = {
    "id": -1,
    "firstName": '',
    "lastName": '',
    "createdBy": '',
    "createdWhen": '',
    "lastEditedBy": '',
    "lastEditedWhen": ''
  }
  @Input() showAddEmployee: boolean = false
  @Output() pushEmplToList = new EventEmitter<Employee>()
  @Output() hideAddEmpl = new EventEmitter<any>()

  employeeList$: Observable<any>

  constructor(
      private store: Store
  ) {
    this.employeeList$ = this.store.select(state => state.employeeList.employeeList)
  }

  addEmployee(employee: Employee): void {
    this.store.dispatch(new AddEmployeeToList(employee))
    this.hideAddEmpl.emit()
    this.employee = {
      "id": -1,
      "firstName": '',
      "lastName": '',
      "createdBy": '',
      "createdWhen": '',
      "lastEditedBy": '',
      "lastEditedWhen": ''
    }
  }
}
