import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      department: ['']
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.toastr.error("Please fill all required fields");
      return;
    }

    this.userService.createUser(this.userForm.value).subscribe({
      next: res => {
        this.toastr.success("User created successfully");
        this.userForm.reset(); 
      },
      error: err => {
        this.toastr.error("Failed to create user");
        console.error(err);
      }
    });
  }
}

