import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  baseUrl: String = ''
  employee?: Employee
  employees: Employee[] = []
  employeeSelectedForModification: Employee[] = []
  employeeSelectedForDeletion: Employee[] = []
  showAddEmployeeInput: boolean = false
  displayedColumns: string[] = ['name', 'edit', 'fire']
  @ViewChild(MatTable) table?: MatTable<any>
  constructor(
      private emplServ: EmployeeService
    ) {}
  selectEmployeeForModification(employee: Employee): void {
    while (this.employeeSelectedForModification.length) {
      this.employeeSelectedForModification.pop()
    }
    this.employeeSelectedForModification.push(employee)
  }
  showAddEmployee(): void {
    this.showAddEmployeeInput = true
  }
  hideAddEmplInput(): void {
    this.showAddEmployeeInput = false
  }
  addEmployeeToList(employee: Employee): void {
    this.employees.push(employee)
    this.table?.renderRows()
  }
  selectForDeletion(employee: Employee): void {
    while (this.employeeSelectedForDeletion.length) {
      this.employeeSelectedForDeletion.pop()
    }
    this.employeeSelectedForDeletion.push(employee)
    this.table?.renderRows()
  }
  removeEmployeeFromList(employee: Employee): void {
    for (let empl of this.employees) {
      if (employee == empl) {
        let index = this.employees.findIndex(e => empl == e)
        this.employees.splice(index, 1)
      }
    }
    this.table?.renderRows()
  }
  ngOnInit(): void {
    this.emplServ.getEmployees()
        .subscribe(empls => this.employees = empls)
  }
}