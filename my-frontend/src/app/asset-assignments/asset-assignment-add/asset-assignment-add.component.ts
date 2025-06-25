import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from 'src/app/services/asset.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-assignment-add.component.html',
  styleUrls: ['./asset-assignment-add.component.scss']
})
export class AssetAssignmentAddComponent implements OnInit {
  assetForm!: FormGroup;
  isSubmitting = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCategories();
  }

  private buildForm(): void {
    this.assetForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: [''],
      categoryId: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      isActive: [true]
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: () => this.toastr.error('Failed to load categories')
    });
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields correctly');
      return;
    }

    Swal.fire({
      title: 'Confirm Creation',
      text: 'Do you want to add this asset?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.isSubmitting = true;
        this.assetService.addAsset(this.assetForm.value).subscribe({
          next: () => {
            this.toastr.success('Asset added successfully');
            this.router.navigate(['/assets']);
          },
          error: () => {
            this.toastr.error('Failed to add asset');
            this.isSubmitting = false;
          }
        });
      }
    });
  }
}
