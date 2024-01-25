import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "../shared/models/employee";
import { Injectable } from "@angular/core";
import { CreateEmployeeInDb as SaveEmployeeToDb, GetEmployeesFromDb as GetEmployeesFromDb, DeleteEmployeeFromDb as DeleteEmployeeFromDb, CreateEmployeeInDb } from "./employee-list.actions";
import { EmployeeService } from "../shared/employee.service";
import { tap } from "rxjs";
import { patch, removeItem } from "@ngxs/store/operators";

export class EmployeeListStateModel {
    employeeList!: Employee[]
}

@State<EmployeeListStateModel>({
    name: 'employeeList',
    defaults: {
        employeeList: []
    }
})
@Injectable()
export class EmployeeListState {

    constructor(private emplServ: EmployeeService) {}

    @Selector()
    static getEmployeeList(state: EmployeeListStateModel) {
        return state.employeeList
    }

    @Action(GetEmployeesFromDb)
    getListFromApi({patchState}: StateContext<EmployeeListStateModel>) {
        this.emplServ.getEmployees()
                .pipe(tap((emplList) => patchState({employeeList: emplList})))
                .subscribe()
    }

    @Action(CreateEmployeeInDb)
    createEmployeeInDb(
        {getState, patchState}: StateContext<EmployeeListStateModel>,
        {payload}: SaveEmployeeToDb
    ) {
        const state = getState()
        this.emplServ.addNewEmployee(payload)
                .pipe(
                    tap((empl) => {
                        patchState({
                            employeeList: [...state.employeeList, empl]
                        })
                    })
                )
                .subscribe()
    }

    @Action(DeleteEmployeeFromDb)
    deleteEmployeeFromDb(
        {setState}: StateContext<EmployeeListStateModel>,
        {payload}: DeleteEmployeeFromDb
    ) {
        // const state = getState()
        this.emplServ.deleteEmployee(payload)
            .pipe(tap((deletedEmpl) => {
                setState(
                    patch({
                        employeeList: removeItem<Employee>((empl) => empl === deletedEmpl)
                    })
                )
            }))
            .subscribe()
    }

}