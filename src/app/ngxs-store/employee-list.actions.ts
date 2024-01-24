import { Employee } from "../shared/models/employee"

export class GetEmployeeList {
    static readonly type = '[EmployeeList] GetList'
    constructor() {}
}

export class AddEmployeeToList {
    static readonly type = '[EmployeeList] AddToList'
    constructor(public payload: Employee) {}
}

export class RemoveEmployeeFromList {
    static readonly type = '[EmployeeList] RemoveFromList'
    constructor(public payload: Employee) {}
}