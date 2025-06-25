import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
