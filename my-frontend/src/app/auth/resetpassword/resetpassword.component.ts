import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.component.html'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  email!: string;
  token!: string;
  message = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const payload = {
        email: this.email,
        token: decodeURIComponent(this.token),
        newPassword: this.resetForm.value.newPassword
      };

      this.http.post('https://localhost:5001/api/account/reset-password', payload)
        .subscribe({
          next: res => {
            this.message = 'Password reset successful!';
            this.router.navigate(['/auth/login']);
          },
          error: err => {
            this.message = 'Reset failed. Try again.';
            console.error(err);
          }
        });
    }
  }
}