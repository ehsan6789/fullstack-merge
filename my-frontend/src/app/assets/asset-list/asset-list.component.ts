import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { CategoryService } from '../../services/category.service';
import { Asset } from '../../models/asset.model';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssetStatus } from 'src/app/enums/asset-status.enum';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  categories: Category[] = [];
  assetFilterText: string = '';
  currentPage: number = 1;

  constructor(
    private assetService: AssetService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAssets();
    this.loadCategories();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe((data) => {
      this.assets = data;
      this.filteredAssets = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  applyAssetFilter(): void {
    const filter = this.assetFilterText.toLowerCase();
    this.filteredAssets = this.assetFilterText
      ? this.assets.filter(asset => asset.name.toLowerCase().includes(filter))
      : this.assets;
  }

  editAsset(id: number): void {
    this.router.navigate(['/assets/edit', id]);
  }
  
getStatusLabel(status: number): string {
  switch (status) {
    case AssetStatus.Active: return 'Active';
    case AssetStatus.Damaged: return 'Damaged';
    case AssetStatus.UnderMaintenance: return 'Under Maintenance';
    default: return 'Unknown';
  }
}

  deleteAsset(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assetService.deleteAsset(id).subscribe(() => {
          this.loadAssets();
          Swal.fire('Deleted!', 'Asset has been deleted.', 'success');
        });
      }
    });
  }
}
