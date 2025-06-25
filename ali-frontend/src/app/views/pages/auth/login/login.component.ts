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

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,  private authService: AuthServiceService,  private toastr: ToastrService ) { }
   // Create the form
   ngOnInit(): void {
    // Create the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  
}
 
  // onLoggedin(e: Event) {
  //   e.preventDefault();
  //   localStorage.setItem('isLoggedin', 'true');
  //   if (localStorage.getItem('isLoggedin')) {
  //     this.router.navigate([this.returnUrl]);
  //   }
  // }
 onLoggedin(event: Event): void {
  event.preventDefault()
  
  if (this.loginForm.invalid) return;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      this.toastr.success('Login successful!', 'Success');  
      this.authService.setToken(res.token);
      this.router.navigate([this.returnUrl]);
    },
    error: () => {
      this.toastr.error('Invalid email or password', 'Login Failed');  
    }
  });
}

}
