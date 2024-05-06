import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { MatTable } from '@angular/material/table';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DialogService } from '../shared/dialog.service';
import { Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { CreateEmployeeInDb, DeleteEmployeeFromDb, GetEmployeesFromDb } from '../ngxs-store/employee-list.actions';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  baseUrl: String = ''
  employee?: Employee
  employeeSelectedForModification: Employee[] = []
  employeeSelectedForDeletion: Employee[] = []
  showAddEmployeeInput: boolean = false
  displayedColumns: string[] = ['name', 'salary', 'edit', 'fire']
  @ViewChild(MatTable) table?: MatTable<any>

  employeeList$: Observable<any>

  constructor(
      private dialogConfirm: DialogService,
      private store: Store
    ) {
      this.employeeList$ = this.store.select(state => state.employeeList.employeeList)
    }

  openConfirm(employee: Employee): void {
    const dialogRef = this.dialogConfirm.dialog.open(ConfirmDeleteComponent, {
      data: employee
    })
    dialogRef.afterClosed()
        // .pipe(
        //   tap(res => {
        //     this.store.dispatch(new DeleteEmployeeFromDb(res))
        //   })
        // )
        .subscribe(res => console.log(res))
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
    this.store.dispatch(new CreateEmployeeInDb(employee))
  }

  selectForDeletion(employee: Employee): void {
    while (this.employeeSelectedForDeletion.length) {
      this.employeeSelectedForDeletion.pop()
    }
    this.employeeSelectedForDeletion.push(employee)
    this.openConfirm(employee)
  }

  ngOnInit(): void {
    this.store.dispatch(new GetEmployeesFromDb())
  }

}