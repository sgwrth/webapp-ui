import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined

  constructor(
      private emplService: EmployeeService,
      private route: ActivatedRoute
  ) {}

  getEmployee(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'))
    this.emplService.getEmployeeById(id)
        .subscribe(employee => this.employee = employee)
  }

  ngOnInit(): void {
    this.getEmployee()
  }
}
