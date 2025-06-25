import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,private authService: AuthServiceService,   private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  onSubmit(): void {
    if (this.registerForm.invalid) return;

        this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Registration successful!', 'Welcome');
       this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Registration failed.', 'Error');
      }
    });
  }
  
}


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//   }

//   onRegister(e: Event) {
//     e.preventDefault();
//     localStorage.setItem('isLoggedin', 'true');
//     if (localStorage.getItem('isLoggedin')) {
//       this.router.navigate(['/']);
//     }
//   }

// }
