import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicUploadPopupComponent } from './profile-pic-upload-popup.component';

describe('ProfilePicUploadPopupComponent', () => {
  let component: ProfilePicUploadPopupComponent;
  let fixture: ComponentFixture<ProfilePicUploadPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePicUploadPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilePicUploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
