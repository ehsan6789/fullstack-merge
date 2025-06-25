import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './views/layout/layout.module';
import { AuthModule } from './views/pages/auth/auth.module';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { ResetPasswordComponent } from './auth/resetpassword/resetpassword.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

import { AssetListComponent } from './assets/asset-list/asset-list.component';
import { AssetAddComponent } from './assets/asset-add/asset-add.component';
import { AssetEditComponent } from './assets/asset-edit/asset-edit.component';

import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';

import { AssetAssignmentListComponent } from './asset-assignments/asset-assignment-list/asset-assignment-list.component';
import { AssetAssignmentAddComponent } from './asset-assignments/asset-assignment-add/asset-assignment-add.component';
import { AssetAssignmentEditComponent } from './asset-assignments/asset-assignment-edit/asset-assignment-edit.component';

//  Standalone Components (only these go in imports)
import { MaintenanceRecordsListComponent } from './maintenance-records/maintenance-records-list/maintenance-records-list.component';

import { MaintenanceRecordAddComponent } from './maintenance-records/maintenance-record-add/maintenance-record-add.component';
import { MaintenanceRecordEditComponent } from './maintenance-records/maintenance-record-edit/maintenance-record-edit.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthGuard } from './core/guard/auth.guard';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { UsersModule } from './users/users/users.module';



@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ResetPasswordComponent,
    UserListComponent,
    AddUserComponent,
    CreateUserComponent,
    EditUserComponent,
    AssetListComponent,
    AssetAddComponent,
    AssetEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    AssetAssignmentListComponent,
    AssetAssignmentAddComponent,
    AssetAssignmentEditComponent,
    MaintenanceRecordAddComponent,     
    MaintenanceRecordEditComponent     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AuthModule,
    NgxPaginationModule,
   
    MaintenanceRecordsListComponent,   
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), UsersModule,
  
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



