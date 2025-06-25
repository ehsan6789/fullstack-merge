import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaintenanceRecordService } from '../../services/maintenance-records.service';
import { MaintenanceRecord } from '../../models/maintenance-record.model';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-maintenance-records-list',
  templateUrl: './maintenance-records-list.component.html',
  styleUrls: ['./maintenance-records-list.component.scss'],
  imports: [CommonModule, RouterModule, NgxPaginationModule]
})
export class MaintenanceRecordsListComponent implements OnInit {
  records: MaintenanceRecord[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(
    private router: Router,
    private maintenanceService: MaintenanceRecordService
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.maintenanceService.getAll().subscribe({
      next: data => this.records = data,
      error: () => console.error('Failed to load maintenance records')
    });
  }

  editRecord(id: number): void {
    this.router.navigate(['/maintenance-records/edit', id]);
  }

  deleteRecord(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This maintenance record will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then(result => {
      if (result.isConfirmed) {
        this.maintenanceService.delete(id).subscribe(() => {
          this.records = this.records.filter(r => r.id !== id);
          Swal.fire('Deleted!', 'Maintenance record has been deleted.', 'success');
        });
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
