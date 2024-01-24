import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "../shared/models/employee";
import { Injectable } from "@angular/core";
import { AddEmployeeToList, GetEmployeeList, RemoveEmployeeFromList } from "./employee-list.actions";
import { EmployeeService } from "../shared/employee.service";
import { first, tap } from "rxjs";

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

    @Action(GetEmployeeList)
    getListFromApi({patchState}: StateContext<EmployeeListStateModel>) {
        this.emplServ.getEmployees()
                .pipe(tap((emplList) => patchState({employeeList: emplList})))
                .subscribe()
    }

    @Action(AddEmployeeToList)
    addEmployeeToList(
        {getState, patchState}: StateContext<EmployeeListStateModel>,
        {payload}: AddEmployeeToList
    ) {
        const state = getState()
        this.emplServ.addNewEmployee(payload)
                .pipe(
                    tap((emplList) => {
                        patchState({
                            employeeList: [...state.employeeList, payload]
                        })
                    })
                )
                .subscribe()
    }

    @Action(RemoveEmployeeFromList)
    removeEmployeeFromList(
        {getState, patchState}: StateContext<EmployeeListStateModel>,
        {payload}: RemoveEmployeeFromList
    ) {
        const state = getState()
        let tempArray: Employee[] = state.employeeList
        for (let empl of tempArray) {
            if (payload == empl) {
                let index = tempArray.findIndex(e => empl == e)
                tempArray.splice(index, 1)
            }
        }
        patchState({
            employeeList: tempArray
        })
    }

}