import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MyHttpError } from "../shared/models/http-error";
import { Injectable } from "@angular/core";
import { SetMyHttpError } from "./http-error.actions";

export class MyHttpErrorStateModel {
    myHttpError!: MyHttpError[]
}

@State<MyHttpErrorStateModel>({
    name: 'myHttpError',
    defaults: {
        myHttpError: [{
            status: 200
        }]
    }
})
@Injectable()
export class MyHttpErrorState {

    @Selector([MyHttpErrorState])
    static getMyHttpError(state: MyHttpErrorStateModel) {
        return state.myHttpError
    }

    @Action(SetMyHttpError)
    setError(
        {patchState}: StateContext<MyHttpErrorStateModel>,
        {payload}: SetMyHttpError
    ) {
        let newError = {
            status: payload
        }
        patchState({
            myHttpError: [newError]
        })
    }

}