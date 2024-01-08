import { Component } from '@angular/core';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-modify',
  templateUrl: './employee-modify.component.html',
  styleUrl: './employee-modify.component.css'
})
export class EmployeeModifyComponent {
  employeesToBeModified: Employee[] = []
  selectEmployeeForModification(employee: Employee): void {
    this.employeesToBeModified.push(employee)
  }
}
