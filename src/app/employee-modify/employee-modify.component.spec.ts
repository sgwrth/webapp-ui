import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModifyComponent } from './employee-modify.component';

describe('EmployeeModifyComponent', () => {
  let component: EmployeeModifyComponent;
  let fixture: ComponentFixture<EmployeeModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
