import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from 'src/app/services/asset.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { Asset } from 'src/app/models/asset.model';
import Swal from 'sweetalert2';
import { AssetStatus } from 'src/app/enums/asset-status.enum';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {
  assetForm!: FormGroup;
  assetId!: number;
  isLoading = true;
  isSubmitting = false;
  categories: Category[] = [];


  statusOptions: { label: string; value: AssetStatus }[] = [
    { label: 'Active', value: AssetStatus.Active },
    { label: 'Damaged', value: AssetStatus.Damaged },
    { label: 'Under Maintenance', value: AssetStatus.UnderMaintenance }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.assetId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadCategories();
    this.loadAsset();
  }

  initForm() {
    this.assetForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      description: [''],
      categoryId: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      cost: [0, [Validators.min(0)]],
      isActive: [true],
      status: [AssetStatus.Active, Validators.required]
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: () => this.toastr.error('Failed to load categories')
    });
  }

  loadAsset() {
    this.assetService.getAssetById(this.assetId).subscribe({
      next: (asset: Asset) => {
        this.assetForm.patchValue({
          ...asset,
          id: this.assetId,
          status: Number(asset.status) 
        });
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load asset');
        this.router.navigate(['/assets']);
      }
    });
  }

  onSubmit(): void {
  if (this.assetForm.invalid) {
    this.toastr.error('Please fill all required fields correctly');
    return;
  }

  Swal.fire({
    title: 'Confirm Update',
    text: 'Do you want to update this asset?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      this.isSubmitting = true;

      const updatedAsset = {
        ...this.assetForm.value,
        status: Number(this.assetForm.value.status) // ✅ ensure correct enum number
      };

      console.log('Updating asset:', updatedAsset);

      this.assetService.updateAsset(this.assetId, updatedAsset).subscribe({
        next: () => {
          this.toastr.success('Asset updated successfully');

     
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/assets']);
          });
        },
        error: () => {
          this.toastr.error('Failed to update asset');
          this.isSubmitting = false;
        }
      });
    }
  });
}

}




