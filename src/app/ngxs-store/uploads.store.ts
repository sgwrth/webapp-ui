import { Injectable } from "@angular/core";
import { Upload } from "../shared/models/upload";
import { Selector, State } from "@ngxs/store";

export class UploadStateModel {
    uploads!: Upload[]
}

@State<UploadStateModel>({
    name: 'uploads',
    defaults: {
        uploads: []
    }
})
@Injectable()
export class UploadState {

    @Selector([UploadStateModel])
    static getUploads(state: UploadStateModel) {
        return state.uploads
    }

}