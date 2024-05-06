import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, finalize, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { HttpEventType } from '@angular/common/http';
import { SetMyHttpError } from '../ngxs-store/http-error.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { FileTransferService } from '../shared/file-transfer.service';

@Component({
  selector: 'app-file-upload-popup',
  templateUrl: './file-upload-popup.component.html',
  styleUrl: './file-upload-popup.component.css'
  })

export class FileUploadPopupComponent implements OnInit {

  userNgxs$: Observable<any>
  myHttpError$: Observable<any>

  @Input() requiredFileType: string = 'image/png, application/pdf'
  allowedFiletypes: string[] = [
    '.png',
    '.pdf'
  ]
  fileName: string = ''
  failedFileName: string = ''
  uploadProgress?: number | null
  uploadSub?: Subscription | null
  file?: File
  isInvalidFiletype: boolean = false
  hasUploadFailed: boolean = false
  wasUploadSuccessful: boolean = false
  uploadedFiles: String[] = []
  @ViewChild('fileUpload') fileUploadVariable!: ElementRef
  httpStatus!: number

  constructor(
      private fileServ: FileTransferService,
      private store: Store,
      public dialogRef: MatDialogRef<FileUploadPopupComponent>,
  ) {
    this.userNgxs$ = this.store.select(state => state.userNgxs.userNgxs)
    this.myHttpError$ = this.store.select(state => state.myHttpError.myHttpError)
  }

  onFileSelected(event: any) {
    this.store.dispatch(new SetMyHttpError(200))
    this.wasUploadSuccessful = false
    this.hasUploadFailed = false
    this.file = event.target.files[0];
    if (this.checkFiletype(this.file!)) {
      this.fileName = this.file!.name
      this.isInvalidFiletype = false
    } else {
      this.unselectFile()
      this.isInvalidFiletype = true
    }
  }
  
  checkFiletype(file: File): boolean {
    switch (file.type) {
      case 'image/png':
        return true
      case 'application/pdf':
        return true
      default:
        return false
    }
  }

  submitFile() {
    const upload$ = this.fileServ.postFormData(this.prepareFormData())
        .pipe(
            tap(
                res => this.checkForUploadFailure(res)
            ),
            finalize(() => this.reset())
        );
    this.uploadSub = upload$.subscribe(event => {
      this.calculateProgress(event)
      this.checkForUploadSuccess(event)
    })
    this.myHttpError$
      .pipe(
          tap(
              res => this.httpStatus = res[0].status
          )
      )
      .subscribe()
  }

  prepareFormData(): FormData {
    const formData = new FormData()
    formData.append('file', this.file!)
    this.appendUserEmail(formData)
    return formData
  }

  appendUserEmail(formData: FormData): void {
    this.userNgxs$
        .pipe(
            tap(
                res => formData.append('email', res[0].email)
            )
        )
        .subscribe()
  }

  checkForUploadFailure(res: any): void {
    if (200 != res.status && undefined != res.status) {
      this.hasUploadFailed = true
      this.failedFileName = this.fileName;
      this.unselectFile()
    }
  }

  reset(): void {
    this.uploadProgress = null
    this.uploadSub = null
  }

  calculateProgress(event: any): void {
    if (event.loaded && event.total && event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total)) 
    }
  }

  checkForUploadSuccess(event: any): void {
    if (200 == event.status && null != event.body) {
      this.pushFilenameToListIfUploadComplete(event)
      this.wasUploadSuccessful = true
      this.unselectFile()
      this.hasUploadFailed = false
    }
  }

  unselectFile() {
    this.fileUploadVariable.nativeElement.value = null
    this.file = this.fileUploadVariable.nativeElement
    if ('' === this.file?.name) {
      this.fileName = ''
    }
  }

  pushFilenameToListIfUploadComplete(event: any): void {
    if (100 == this.uploadProgress && 200 == event.status) {
      this.uploadedFiles.push(this.fileName)
    }
  }

  cancelUpload(): void {
    this.uploadSub?.unsubscribe()
    this.reset()
  }

  closePopup(): void {
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }

}
