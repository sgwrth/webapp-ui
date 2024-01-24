import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModifyComponent } from './employee-modify/employee-modify.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { NgxsModule } from '@ngxs/store';
import { NGXS_LOGGER_PLUGIN_OPTIONS, NgxsLoggerPlugin, NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserNgxs } from './shared/models/user-ngxs';
import { UserNgxsState } from './ngxs-store/user-ngxs.store';
import { EmployeeListState } from './ngxs-store/employee-list.store';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeModifyComponent,
    LoginComponent,
    EmployeeAddComponent,
    ConfirmDeleteComponent,
    EmployeeDetailsComponent,
    ErrorNotFoundComponent,
    WelcomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule, 
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    NgxsModule.forRoot([
      UserNgxsState,
      EmployeeListState
    ]),
    NgxsLoggerPluginModule,
    NgxsReduxDevtoolsPluginModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
