import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { UserNgxs } from "../shared/models/user-ngxs";
import { AddUserNgxs } from "./user-ngxs.actions";

export class UserNgxsStateModel {

    userNgxs!: UserNgxs[]

}

@State<UserNgxsStateModel>({
    name: 'userNgxs',
    defaults: {
        userNgxs: [] 
    }
})
@Injectable()
export class UserNgxsState {

    @Selector()
    static getUserNgxs(state: UserNgxsStateModel) {
        return state.userNgxs
    }

    @Action(AddUserNgxs)
    add({getState, patchState}: StateContext<UserNgxsStateModel>, {payload}: AddUserNgxs) {
        const state = getState()
        patchState({
            userNgxs: [...state.userNgxs, payload]
        })
    }
}