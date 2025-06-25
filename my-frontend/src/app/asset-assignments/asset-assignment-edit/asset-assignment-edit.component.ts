import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetAssignment } from '../../models/asset-assignment.model';
import { AssetAssignmentService } from '../../services/asset-assignment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset-assignment-edit',
  templateUrl: './asset-assignment-edit.component.html',
  styleUrls: ['./asset-assignment-edit.component.scss']
})
export class AssetAssignmentEditComponent implements OnInit {
  assignment: AssetAssignment = {
    id: 0,
    assetId: 0,
    assignedToUserId: '',
    assignedDate: '',
    returnDate: undefined
  };

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssetAssignmentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

 ngOnInit(): void {
  this.id = +this.route.snapshot.paramMap.get('id')!;
  this.assignmentService.getById(this.id).subscribe({
    next: data => {
      this.assignment = {
        ...data,
        assignedDate: data.assignedDate ? data.assignedDate.split('T')[0] : '',
        returnDate: data.returnDate ? data.returnDate.split('T')[0] : ''
      };
    },
    error: () => this.toastr.error('Failed to load assignment')
  });
}


  onSubmit(): void {
    Swal.fire({
      title: 'Confirm Update',
      text: 'Are you sure you want to update this assignment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignmentService.update(this.id, this.assignment).subscribe({
          next: () => {
            this.toastr.success('Assignment updated successfully');
            this.router.navigate(['/asset-assignments']);
          },
          error: () => this.toastr.error('Update failed')
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/asset-assignments']);
  }
}

