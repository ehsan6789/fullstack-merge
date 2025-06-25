import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceRecordService } from '../../services/maintenance-records.service';
import { Router } from '@angular/router';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-record-add',
  templateUrl: './maintenance-record-add.component.html',
  styleUrls: ['./maintenance-record-add.component.scss']
})
export class MaintenanceRecordAddComponent implements OnInit {
  recordForm: FormGroup;
  assets: Asset[] = [];

  constructor(
    private fb: FormBuilder,
    private service: MaintenanceRecordService,
    private assetService: AssetService,
    private router: Router
  ) {
    this.recordForm = this.fb.group({
      assetId: ['', Validators.required],
      maintenanceDate: ['', Validators.required],
      description: ['', Validators.required],
      technicianName: [''],
      cost: ['', Validators.required]
    });
  }

 ngOnInit(): void {
  this.assetService.getAssets().subscribe({
    next: (data: Asset[]) => this.assets = data,
    error: () => console.error('Failed to load assets')
  });
}

  submit(): void {
    if (this.recordForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill all required fields.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Creation',
      text: 'Do you want to add this maintenance record?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.create(this.recordForm.value).subscribe({
          next: () => {
            Swal.fire('Created!', 'Maintenance record added successfully.', 'success');
            this.router.navigate(['/maintenance-records']);
          },
          error: () => {
            Swal.fire('Error!', 'Failed to add maintenance record.', 'error');
          }
        });
      }
    });
  }
}

