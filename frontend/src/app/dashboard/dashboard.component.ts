import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dashboard.component.css'], // 👈 Keep this comma
  templateUrl: './dashboard.component.html'  // 👈 Switched from 'template' to 'templateUrl'
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  activeTab = signal<string>('profile');
  errorMsg = signal<string>('');

  profileData = signal<any>(null);
  paymentsList = signal<any[]>([]);
  adminUsersList = signal<any[]>([]);

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.errorMsg.set('');
    this.activeTab.set('profile');
    this.http.get('http://localhost:8080/api/profile').subscribe({
      next: (data) => this.profileData.set(data),
      error: (err) => this.handleHttpError(err)
    });
  }

  fetchPayments() {
    this.errorMsg.set('');
    this.activeTab.set('payments');
    this.http.get<any[]>('http://localhost:8080/api/payments').subscribe({
      next: (data) => this.paymentsList.set(data),
      error: (err) => this.handleHttpError(err)
    });
  }

  fetchAdminUsers() {
    this.errorMsg.set('');
    this.activeTab.set('admin');
    this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe({
      next: (data) => this.adminUsersList.set(data),
      error: (err) => this.handleHttpError(err)
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private handleHttpError(err: any) {
    if (err.status === 403) {
      this.errorMsg.set('Access Denied: You do not possess the required Admin authorization clearances.');
    } else {
      this.errorMsg.set('Could not fetch protected records. Access token might be invalid or expired.');
    }
    console.error(err);
  }
}
