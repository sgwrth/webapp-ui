import { Upload } from "../shared/models/upload";

export class AddUpload {
    static readonly type = '[Upload] AddUpload'
    constructor(private payload: Upload) {}
}