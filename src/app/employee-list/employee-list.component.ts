import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/models/employee';
import { MatTable } from '@angular/material/table';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DialogService } from '../shared/dialog.service';
import { LoggedInUserService } from '../shared/logged-in-user.service';

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
      private emplServ: EmployeeService,
      private dialogConfirm: DialogService,
    ) {
    }

  openConfirm(employee: Employee): void {
    const dialogRef = this.dialogConfirm.dialog.open(ConfirmDeleteComponent, {
      data: employee
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.removeEmployeeFromList(result)
    })
  }
  selectEmployeeForModification(employee: Employee): void {
    while (this.employeeSelectedForModification.length) {
      this.employeeSelectedForModification.pop()
    }
    console.log(employee)
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
    this.openConfirm(employee)
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