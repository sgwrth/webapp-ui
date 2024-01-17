import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

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
    "createdWhen": ''
  }
  @Input() showAddEmployee: boolean = false
  @Output() pushEmplToList = new EventEmitter<Employee>()
  @Output() hideAddEmpl = new EventEmitter<any>()
  constructor(private emplServ: EmployeeService) {}
  addEmployee(employee: Employee): void {
    this.emplServ.addNewEmployee(employee)
        .subscribe(empl => this.pushEmplToList.emit(empl))
    this.hideAddEmpl.emit()
    this.employee = {
      "id": -1,
      "firstName": '',
      "lastName": '',
      "createdBy": '',
      "createdWhen": ''
    }
  }
}
