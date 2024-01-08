import { Component, Input, ViewChild } from '@angular/core';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-modify',
  templateUrl: './employee-modify.component.html',
  styleUrl: './employee-modify.component.css'
})
export class EmployeeModifyComponent {
  @Input() employeeToBeModified: Employee[] = []
  @ViewChild('employeeForm') emplForm?: NgForm;
  constructor(
    private emplServ: EmployeeService
  ) {}
  modifyEmployee(employee: Employee): void {
    this.emplServ.updateEmployee(employee)
        .subscribe()
    this.employeeToBeModified.pop()
  }
}
