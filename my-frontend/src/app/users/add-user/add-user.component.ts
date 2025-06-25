import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CreateUserDto } from '../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  roles: string[] = ['SuperAdmin', 'Admin', 'Accounts', 'Operations', 'HR']; // ✅ Can be dynamic later

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const user: CreateUserDto = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword
    };

    this.userService.createUser(user).subscribe({
      next: () => {
        alert('User created successfully!');
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('User creation failed.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
