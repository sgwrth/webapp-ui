import { UserNgxs } from "../shared/models/user-ngxs";

export class AddUserNgxs {

    static readonly type = '[UserNgxs] Add'

    constructor(public payload: UserNgxs) {}

}