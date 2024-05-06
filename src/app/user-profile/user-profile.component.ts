import { Component } from '@angular/core';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Pics } from '../shared/models/pics';
import { ProfilePicUploadPopupComponent } from '../profile-pic-upload-popup/profile-pic-upload-popup.component';
import { FileTransferService } from '../shared/file-transfer.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user$: Observable<any>
  user!: User
  profilePic$: Observable<any>
  profilePic?: Pics

  constructor(
      private store: Store,
      private fileServ: FileTransferService,
      private dialogServ: DialogService
  ) {
    this.user$ = this.store.select(state => state.userNgxs.userNgxs)
    this.profilePic$ = this.store.select(state => state.profilePic.profilePic)
  }

  openProfilePic(): void {
    const popup = this.dialogServ.dialog.open(ProfilePicUploadPopupComponent)
    popup.afterClosed().subscribe(result => {
      this.fileServ.getProfilePic()
          .subscribe(pic => {
            this.fileServ.setProfilePic(pic.path, pic.fileName)
        })
    })
  }

  ngOnInit(): void {
    this.user$.subscribe(result => this.user = result[0])
    this.profilePic$.subscribe(result => this.profilePic = result[0])
  }
}
