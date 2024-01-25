import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateEmployeeInDb } from '../ngxs-store/employee-list.actions';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {

  employeeList$: Observable<any>
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

  constructor(
      private store: Store
  ) {
    this.employeeList$ =
        this.store.select(state => state.employeeList.employeeList)
  }

  addEmployee(employee: Employee): void {
    this.store.dispatch(new CreateEmployeeInDb(employee))
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
