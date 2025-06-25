// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   private apiUrl = 'https://localhost:7083/api/Auth';
  

//   constructor(private http: HttpClient) {}

//   login(data: any) {
//     return this.http.post(`${this.apiUrl}/login`, data);
//   }

//   register(data: any) {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }

//   setToken(token: string) {
//     localStorage.setItem('token', token);
//     localStorage.setItem('isLoggedin', 'true'); 
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('isLoggedin');

//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface UserInfo {
  username?: string;
  email?: string;
  sub?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'https://localhost:7083/api/auth';
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Initialize user info on service creation
    this.loadUserInfo();
  }
// Forgot password method
forgotPassword(email: string) {
  return this.http.post<any>('https://localhost:7083/api/Auth/forgot-password', { email });
}


// Reset password method
resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/reset-password`, { 
    token, 
    newPassword 
  });
}
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
    
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedin', 'true');
    this.loadUserInfo(); // Load user info after setting token
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Check if token is expired
    try {
      const payload = this.decodeJWT(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  private loadUserInfo(): void {
    const token = this.getToken();
    if (token) {
      try {
        const payload = this.decodeJWT(token);
        const userInfo: UserInfo = {
          username: payload.unique_name || payload.name || payload.sub,
          email: payload.email || payload.unique_name,
          sub: payload.sub
        };
        this.currentUserSubject.next(userInfo);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.currentUserSubject.next(null);
      }
    } else {
      this.currentUserSubject.next(null);
    }
  }
 
  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  
logout() {
  localStorage.removeItem('token'); 
  localStorage.removeItem('user');
  this.router.navigate(['/auth/login']);
}
}
