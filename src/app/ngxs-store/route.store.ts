import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetMyRoute } from "./route.actions";
import { NavRoute } from "../shared/models/nav-route";

export class MyRouteStateModel {
    myRoute!: NavRoute[] 
}

@State<MyRouteStateModel>({
    name: 'myRoute',
    defaults: {
        myRoute: []
    }
})
@Injectable()
export class MyRouteState {

    @Selector([MyRouteState])
    static getMyRoute(state: MyRouteStateModel) {
        return state.myRoute
    }

    @Action(SetMyRoute)
    addRoute(
            {patchState}: StateContext<MyRouteStateModel>,
            {payload}: SetMyRoute
    ) {
        let newRoute = {
            navRoute: payload
        }
        patchState({
            myRoute: [newRoute]
        })
    }

}