import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  returnUrl: any;
  loginError: string = ''; // <-- Add this line

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@demo.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onLoggedin(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) return;

    this.loginError = ''; // Clear any previous error

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success('Login successful!', 'Success');
        this.authService.setToken(res.token);
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.loginError = err.error || 'Invalid email or password'; // Show backend message
      }
    });
  }
}
