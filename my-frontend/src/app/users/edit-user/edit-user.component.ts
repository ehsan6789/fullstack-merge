import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  roles: string[] = ['SuperAdmin', 'Admin', 'Accounts', 'Operations', 'HR'];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.userForm = this.fb.group({
      id: [this.userId],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [''],
      role: ['', Validators.required],
      isActive: [true],
      password: ['', Validators.minLength(10)] // Optional
    });

    this.userService.getUserById(this.userId).subscribe((data: any) => {
      this.userForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = {
        id: this.userId,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        department: this.userForm.value.department,
        role: this.userForm.value.role,
        isActive: this.userForm.value.isActive,
        ...(this.userForm.value.password ? { password: this.userForm.value.password } : {})
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'User updated successfully!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
          });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update user!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          console.error(err);
        }
      });
    } else {
      this.userForm.markAllAsTouched(); // Show validation messages
    }
  }
}
