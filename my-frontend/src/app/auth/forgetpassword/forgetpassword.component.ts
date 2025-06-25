import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgetpassword.component.html',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule],
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message = '';
  isSubmitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      const email = this.forgotForm.value.email;

      this.authService.forgotPassword(email).subscribe({
        next: (res: any) => {
          this.message = res?.message || 'If the email exists, a reset link has been sent.';
          this.isSubmitted = true;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.message = 'Something went wrong. Please try again.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.forgotForm.controls).forEach(key => {
        this.forgotForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper method to check if field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.forgotForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }

  // Navigate back to login
  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}