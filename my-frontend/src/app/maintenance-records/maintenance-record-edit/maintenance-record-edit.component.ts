import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaintenanceRecordService } from '../../services/maintenance-records.service';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-record-edit',
  templateUrl: './maintenance-record-edit.component.html',
  styleUrls: ['./maintenance-record-edit.component.scss']
})
export class MaintenanceRecordEditComponent implements OnInit {
  recordForm!: FormGroup;
  recordId!: number;
  assets: Asset[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: MaintenanceRecordService,
    private assetService: AssetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recordId = +this.route.snapshot.paramMap.get('id')!;


   this.assetService.getAssets().subscribe((data: Asset[]) => {
      this.assets = data;
    });

    this.service.getById(this.recordId).subscribe(record => {
      this.recordForm = this.fb.group({
        assetId: [record.assetId],
        maintenanceDate: [record.maintenanceDate],
        description: [record.description],
        technicianName: [record.technicianName],
        cost: [record.cost]
      });
    });
  }

  update(): void {
    if (this.recordForm.invalid) return;

    Swal.fire({
      title: 'Confirm Update',
      text: 'Do you want to update this maintenance record?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.update(this.recordId, this.recordForm.value).subscribe(() => {
          Swal.fire('Updated!', 'Maintenance record has been updated.', 'success');
          this.router.navigate(['/maintenance-records']);
        });
      }
    });
  }
}
