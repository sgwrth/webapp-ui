import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Doks } from './models/doks';
import { Pics } from './models/pics';
import { SetProfilePic } from '../ngxs-store/profile-pic.actions';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {

  baseUrlUpload: string = environment.baseUrlUpload
  baseUrlFiles: string = environment.baseUrlFiles
  baseUrlPics: string = environment.baseUrlPics

  constructor(
      private http: HttpClient,
      private emplServ: EmployeeService,
      private store: Store
  ) { }

  postFormData(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrlUpload, formData, {
      reportProgress: true,
      observe: 'events',
      headers: this.emplServ.createHttpHeaders(),
      responseType: 'text'
    })
  }
  
  postPicture(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrlUpload}/pic`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: this.emplServ.createHttpHeaders(),
      responseType: 'text'
    })
  }

  getAllUploads(): Observable<Doks[]> {
    return this.http.get<Doks[]>(this.baseUrlFiles, {
      headers: this.emplServ.createHttpHeaders()
    })
  }

  downloadFile(filePath: string, fileName: string): Observable<any> {
    let doksCommand = {
      path: filePath,
      name: fileName
    }
    // no '<any>' after 'post'!
    return this.http.post(`${this.baseUrlFiles}/download`, doksCommand, {
      headers: this.emplServ.createHttpHeaders(),
      responseType: 'arraybuffer'
    })
  }

  setProfilePic(filePath: string, fileName: string) {
    this.downloadFile(filePath, fileName)
        .subscribe(data => this.store.dispatch(new SetProfilePic(data)))
  }

  getProfilePic(): Observable<Pics> {
    return this.http.get<Pics>(`${this.baseUrlPics}`, {
      headers: this.emplServ.createHttpHeaders()
    })
  }

}