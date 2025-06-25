import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
  

})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee/edit', id]);
  }

  // deleteEmployee(id: number) {
  //   if (confirm('Are you sure you want to delete this employee?')) {
  //     this.employeeService.deleteEmployee(id).subscribe(() => {
  //       this.loadEmployees();
  //     });
  //   }
  // }
  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          this.loadEmployees();
          Swal.fire(
            'Deleted!',
            'The employee has been deleted.',
            'success'
          );
        });
      }
    });
  }
  
  createEmployee() {
    this.router.navigate(['/employee/create']);
  }
  showModal = false;
isEditMode = false;
selectedEmployeeId: number | null = null;

openEmployeeModal(id?: number) {
  this.isEditMode = !!id;
  this.selectedEmployeeId = id ?? null;
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
  this.selectedEmployeeId = null;
}

onModalClose(refresh: boolean) {
  this.closeModal();
  if (refresh) {
    this.loadEmployees();
  }
}
// pageSize = 7;
// currentPage = 1;

// get paginatedEmployees() {
//   const start = (this.currentPage - 1) * this.pageSize;
//   return this.employees.slice(start, start + this.pageSize);
// }

// nextPage() {
//   if (this.hasMorePages()) {
//     this.currentPage++;
//   }
// }

// prevPage() {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//   }
// }

// hasMorePages() {
//   return this.currentPage * this.pageSize < this.employees.length;
// }
searchTerm = '';
statusFilter = '';
pageSize = 7;
currentPage = 1;
Math = Math; 

get filteredEmployees() {
  return this.employees.filter(emp => {
    const term = this.searchTerm.toLowerCase();
    const matchSearch =
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.phoneNo.includes(term);
    const matchStatus = this.statusFilter ? emp.status === this.statusFilter : true;
    return matchSearch && matchStatus;
  });
}

get paginatedEmployees() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredEmployees.slice(start, start + this.pageSize);
}

nextPage() {
  if (this.hasMorePages()) this.currentPage++;
}

prevPage() {
  if (this.currentPage > 1) this.currentPage--;
}

hasMorePages() {
  return this.currentPage * this.pageSize < this.filteredEmployees.length;
}

exportToCSV() {
  const headers = ['Name', 'Email', 'Phone', 'Department', 'Status'];
  const rows = this.filteredEmployees.map(emp => [
    emp.name,
    emp.email,
    emp.phoneNo,
    emp.departmentName,
    emp.status,
  ]);

  let csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'employees.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

}
