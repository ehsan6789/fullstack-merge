import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../Services/user.service';
import { UserDto, UpdateUserDto } from '../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  Math = Math;

  users: UserDto[] = [];
  searchTerm: string = '';
  roleFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  roles: string[] = ['SuperAdmin', 'Admin', 'Accounts', 'Operations', 'HR'];

  private refreshSubscription!: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();

    this.refreshSubscription = this.userService.refreshNeeded$.subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

loadUsers(): void {
  this.userService.getAllUsers().subscribe({
    next: (data) => {
      console.log('API Response:', data);
      this.users = Array.isArray(data.users) ? data.users : [];
    },
    error: (err) => {
      console.error('Error loading users:', err);
      this.users = [];
    }
  });
}


  get filteredUsers(): UserDto[] {
    // Defensive: If users is null or not array, return empty array
    if (!Array.isArray(this.users)) return [];

    return this.users.filter(user =>
      (!this.searchTerm || user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.email.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.roleFilter || user.role === this.roleFilter)
    );
  }

  get paginatedUsers(): UserDto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.hasMorePages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  hasMorePages(): boolean {
    return this.currentPage < Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  toggleStatus(user: UserDto): void {
    const updatedUser: UpdateUserDto = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: !user.isActive
    };

    this.userService.updateUser(user.id, updatedUser).subscribe({
      next: () => {
        user.isActive = updatedUser.isActive;
        Swal.fire({
          icon: 'success',
          title: `User ${user.isActive ? 'activated' : 'deactivated'} successfully!`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update status!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true
        });
      }
    });
  }

  editUser(userId: string): void {
    this.router.navigate(['/users/edit', userId]);
  }

  deleteUser(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== userId);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error: () => {
            Swal.fire('Error!', 'Failed to delete user.', 'error');
          }
        });
      }
    });
  }
}
