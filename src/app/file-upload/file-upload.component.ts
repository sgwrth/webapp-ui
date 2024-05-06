import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../shared/dialog.service';
import { FileUploadPopupComponent } from '../file-upload-popup/file-upload-popup.component';
import { FileTransferService } from '../shared/file-transfer.service';
import { tap } from 'rxjs';
import { Doks } from '../shared/models/doks';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfilePicUploadPopupComponent } from '../profile-pic-upload-popup/profile-pic-upload-popup.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent implements OnInit {

  uploads: Doks[] = []
  image: any
  datasource?: MatTableDataSource<any>
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['path', 'file']
  // pgIndex = 2
  firstLastButtons = true
  pnDisabled = true
  // hdPageSize = true

  constructor(
      private dialogServ: DialogService,
      private fileServ: FileTransferService,
      private sanitizer: DomSanitizer,
  ) {}

  // ngAfterViewInit() {
  //   console.log(this.uploads.length)
  //   console.log(this.uploads![0])
  // }

  // onChangePage(event: PageEvent) {
  //   console.log(event.pageIndex)
  //   console.log(event.pageSize)
  // }

  openUploadDialog(): void {
    this.dialogServ.dialog.open(FileUploadPopupComponent)
  }

  openProfilePicUploadDialog(): void {
    const popup = this.dialogServ.dialog.open(ProfilePicUploadPopupComponent)
    popup.afterClosed().subscribe(res => {
      this.fileServ.getProfilePic()
          .subscribe(res => {
            this.fileServ.setProfilePic(res.path, res.fileName)
          })
    })
  }

  getAllUploads(): void {
    this.fileServ.getAllUploads()
        .subscribe(
            res => {
              if (null !== res) {
                this.uploads = res
                this.datasource = new MatTableDataSource<Doks>(res)
                this.datasource.sort = this.sort
                this.datasource.paginator = this.paginator
              }
            }
        )
  }

  downloadFile(filePath: string, fileName: string): void {
    this.fileServ.downloadFile(filePath, fileName)
        .subscribe(
            data => {
              const png = new Blob([data], {type: 'image/png'})
              let objectUrl = URL.createObjectURL(png)
              this.image = this.sanitizer.bypassSecurityTrustUrl(objectUrl)
            }
        )
  }

  ngOnInit(): void {
    this.getAllUploads()
  }

}