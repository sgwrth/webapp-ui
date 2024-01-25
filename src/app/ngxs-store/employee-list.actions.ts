import { Employee } from "../shared/models/employee"

export class GetEmployeesFromDb {
    static readonly type = '[EmployeeList] GetEmployees'
    constructor() {}
}

export class CreateEmployeeInDb {
    static readonly type = '[EmployeeList] CreateEmployeeInDb'
    constructor(public payload: Employee) {}
}

export class DeleteEmployeeFromDb {
    static readonly type = '[EmployeeList] DeleteEmployeeFromDb'
    constructor(public payload: Employee) {}
}