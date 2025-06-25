import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  category: Category = { id: 0, name: '' };

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.category.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Category name is required.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Creation',
      text: 'Do you want to create this category?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.addCategory(this.category).subscribe(() => {
          Swal.fire('Created!', 'Category has been added.', 'success');
          this.router.navigate(['/categories']);
        });
      }
    });
  }
}

