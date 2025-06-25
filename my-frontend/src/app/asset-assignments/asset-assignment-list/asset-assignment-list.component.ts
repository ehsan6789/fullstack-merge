import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetAssignment } from '../../models/asset-assignment.model';
import { AssetAssignmentService } from '../../services/asset-assignment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset-assignment-list',
  templateUrl: './asset-assignment-list.component.html',
  styleUrls: ['./asset-assignment-list.component.scss']
})
export class AssetAssignmentListComponent implements OnInit {
  assignments: AssetAssignment[] = [];
  currentPage = 1;
  pageSize = 5;

  constructor(
    private assignmentService: AssetAssignmentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.assignmentService.getAll().subscribe({
      next: data => this.assignments = data,
      error: err => this.toastr.error('Failed to load assignments')
    });
  }

  edit(id: number): void {
    this.router.navigate(['/asset-assignments/edit', id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignmentService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Deleted successfully');
            this.loadAssignments();
            Swal.fire('Deleted!', 'The assignment has been deleted.', 'success');
          },
          error: () => {
            this.toastr.error('Delete failed');
            Swal.fire('Error!', 'Something went wrong.', 'error');
          }
        });
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
