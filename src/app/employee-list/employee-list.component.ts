import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  baseUrl: String = ''
  employees: Employee[] = []
  constructor(
      private emplServ: EmployeeService
      ) {}
  ngOnInit(): void {
    this.emplServ.getEmployees()
        .subscribe(employees => this.employees = employees)
  }
}
