import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';

import { ForgotPasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './auth/resetpassword/resetpassword.component';

import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
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

import { MaintenanceRecordsListComponent } from './maintenance-records/maintenance-records-list/maintenance-records-list.component';
import { MaintenanceRecordAddComponent } from './maintenance-records/maintenance-record-add/maintenance-record-add.component';
import { MaintenanceRecordEditComponent } from './maintenance-records/maintenance-record-edit/maintenance-record-edit.component';
import { UsersModule } from './users/users/users.module';

const routes: Routes = [
  // 🔓 Public routes
  {
    path: 'auth',
    loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },

  // 🔐 Protected Routes with Layout
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
        {
        path: 'employee',
        loadChildren: () => import('./users/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },

      // ✅ Assets
      { path: 'assets', component: AssetListComponent },
      { path: 'assets/add', component: AssetAddComponent },
      { path: 'assets/edit/:id', component: AssetEditComponent },

      // ✅ Categories
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/add', component: CategoryAddComponent },
      { path: 'categories/edit/:id', component: CategoryEditComponent },

      // ✅ Asset Assignments
      { path: 'asset-assignments', component: AssetAssignmentListComponent },
      { path: 'asset-assignments/add', component: AssetAssignmentAddComponent },
      { path: 'asset-assignments/edit/:id', component: AssetAssignmentEditComponent },

      // ✅ Maintenance Records
      { path: 'maintenance-records', component: MaintenanceRecordsListComponent },
      { path: 'maintenance-records/add', component: MaintenanceRecordAddComponent },
      { path: 'maintenance-records/edit/:id', component: MaintenanceRecordEditComponent },

      // ✅ Users
      { path: 'users', component: UserListComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/edit/:id', component: EditUserComponent },
    ]
  },

  // ❌ Error and fallback
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: 'Oops! The page you were looking for doesn\'t exist.'
    }
  },
  { path: 'error/:type', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
