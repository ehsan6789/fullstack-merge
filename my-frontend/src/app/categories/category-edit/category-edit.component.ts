import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: Category = { id: 0, name: '' };
  id!: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategory();
  }

  loadCategory(): void {
    this.isLoading = true;
    this.categoryService.getCategoryById(this.id).subscribe({
      next: data => {
        this.category = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error fetching category:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.category.name.trim()) return;

    Swal.fire({
      title: 'Confirm Update',
      text: 'Do you want to update this category?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.updateCategory(this.id, this.category).subscribe(() => {
          Swal.fire('Updated!', 'Category has been updated.', 'success');
          this.router.navigate(['/categories']);
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }
}
