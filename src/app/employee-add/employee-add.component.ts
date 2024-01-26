import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateEmployeeInDb } from '../ngxs-store/employee-list.actions';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit {

  employeeList$: Observable<any>
  employeeFormData = this.formBuilder.group({
    firstName: ['', [Validators.minLength(1)]],
    lastName: ['', [Validators.minLength(1)]],
    salary: [null, [Validators.required, Validators.max(100)]]
  });
  employee!: Employee
  @Input() showAddEmployee: boolean = false
  @Output() pushEmplToList = new EventEmitter<Employee>()
  @Output() hideAddEmpl = new EventEmitter<any>()

  constructor(
      private store: Store,
      private formBuilder: FormBuilder
  ) {
    this.employeeList$ =
        this.store.select(state => state.employeeList.employeeList)
  }

  resetEmployeeData(): void {
     this.employee = {
      "id": -1,
      "firstName": '',
      "lastName": '',
      "createdBy": '',
      "createdWhen": '',
      "lastEditedBy": '',
      "lastEditedWhen": '',
      "salary": 0
    }
  }

  resetEmployeeFormData(): void {
    this.employeeFormData.patchValue({
      firstName: '',
      lastName: '',
      salary: null
    })
  }

  submitEmployee(): void {
    if (this.employeeFormData.value.firstName) {
      this.employee.firstName = this.employeeFormData.value.firstName
    }
    if (this.employeeFormData.value.lastName) {
      this.employee.lastName = this.employeeFormData.value.lastName
    }
    if (this.employeeFormData.value.salary) {
      this.employee.salary = this.employeeFormData.value.salary
    }
    this.store.dispatch(new CreateEmployeeInDb(this.employee))
    this.resetEmployeeData()
    this.resetEmployeeFormData()
    this.hideAddEmpl.emit()
  }

  ngOnInit(): void {
    this.resetEmployeeData()
  }

}