// import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { Router } from '@angular/router';
// import { AuthServiceService } from 'src/app/auth/auth-service.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent implements OnInit {

//   constructor(
//     @Inject(DOCUMENT) private document: Document, 
//     private renderer: Renderer2,
//     private router: Router,
//     private authService: AuthServiceService
//   ) { }

//   ngOnInit(): void {
//   }

//   /**
//    * Sidebar toggle on hamburger button click
//    */
//   toggleSidebar(e: Event) {
//     e.preventDefault();
//     this.document.body.classList.toggle('sidebar-open');
//   }

//   /**
//    * Logout
//    */
//   logout(): void {
//     this.authService.logout();
//   }

// }
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentUser: any = null;
  private userSubscription: Subscription = new Subscription();
  
  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Subscribe to current user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Check if user is logged in, if not redirect to login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout with confirmation
   */
  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
      this.toastr.success('You have been logged out successfully!', 'Logged Out'); 
      // Navigation will be handled by AuthService
    }
  }

  /**
   * Get user display name
   */
  getUserDisplayName(): string {
    if (this.currentUser?.username) {
      return this.currentUser.username;
    }
    if (this.currentUser?.email) {
      return this.currentUser.email.split('@')[0]; // Get username part from email
    }
    return 'User';
  
  }

  /**
   * Get user email
   */
  getUserEmail(): string {
    return this.currentUser?.email || 'user@email.com';

  }

  /**
   * Get user avatar (you can implement avatar logic here)
   */
  getUserAvatar(): string {
    // You can implement user avatar logic here
    // For now, returning placeholder
    return 'https://via.placeholder.com/80x80';
    
  }
}