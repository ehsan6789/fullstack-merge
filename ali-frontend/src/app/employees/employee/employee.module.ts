import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [EmployeeListComponent, EmployeeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeRoutingModule,
    NgSelectModule
  ],
})
export class EmployeeModule {}
