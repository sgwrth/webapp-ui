import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { SetProfilePic } from "./profile-pic.actions";
import { DomSanitizer, SafeUrl, SafeValue } from "@angular/platform-browser";

export class ProfilePicStateModel {
    profilePic!: SafeUrl[]
}

@State<ProfilePicStateModel>({
    name: 'profilePic',
    defaults: {
        profilePic: []
    }
})
@Injectable()
export class ProfilePicState {

    constructor(private sanitizer: DomSanitizer) {}

    @Selector([ProfilePicState])
    static getProfilePicState(state: ProfilePicStateModel) {
        return state.profilePic
    }

    @Action(SetProfilePic)
    setProfilePic(
        {patchState}: StateContext<ProfilePicStateModel>,
        {payload}: SetProfilePic
    ) {
        const png = new Blob([payload], {type: 'image/png'})
        let objectUrl = URL.createObjectURL(png)
        let image: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl)
        patchState({
            profilePic: [image]
        })
         
    }
}