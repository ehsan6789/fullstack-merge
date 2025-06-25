import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../models/department.model';
import { Status } from '../models/status.model';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { StatusService } from '../services/status.service';
import { Employee } from '../models/employee.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  departments: Department[] = [];
  statuses: Status[] = [];
  isEditMode = false;
  employeeId!: number;
    
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdowns();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNo: ['', Validators.required],
      emergencyNo: [''],
      education: [''],
      cnic: ['', Validators.required,    Validators.pattern(/^\d{5}-\d{7}-\d{1}$/)],
      gender: ['Male', Validators.required],
      dateOfBirth: ['', Validators.required],
      experience: [''],
      religion: [''],
      maritalStatus: [''],
      reference: [''],
      dateOfJoining: ['', Validators.required],
      departmentId: [null, Validators.required],
      status: [null, Validators.required],
      bankAccounts: this.fb.array([]),
    });
  }

  get bankAccounts(): FormArray {
    return this.employeeForm.get('bankAccounts') as FormArray;
  }

  createBankAccount(): FormGroup {
    return this.fb.group({
      accountTitle: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      iban: [''],
      reference: [''],
      isPrimary: [false],
    });
  }

  addBankAccount() {
    this.bankAccounts.push(this.createBankAccount());
  }

  removeBankAccount(index: number) {
    this.bankAccounts.removeAt(index);
  }

  markPrimary(index: number) {
    this.bankAccounts.controls.forEach((group, i) => {
      group.get('isPrimary')?.setValue(i === index);
    });
  }

  loadDropdowns() {
    this.departmentService.getDepartments().subscribe((res) => (this.departments = res));
    // this.statusService.getStatuses().subscribe((res) => (this.statuses = res));
    this.statusService.getStatuses().subscribe({
      next: (res) => (this.statuses = res),
      error: () => alert('Failed to load statuses'),
    });
  }

  // loadEmployee(id: number) {
  //   this.employeeService.getEmployeeById(id).subscribe((emp) => {
  //     this.employeeForm.patchValue(emp);
  //     if (emp.bankAccounts && emp.bankAccounts.length > 0) {
  //       emp.bankAccounts.forEach((acc) => {
  //         const accForm = this.createBankAccount();
  //         accForm.patchValue(acc);
  //         this.bankAccounts.push(accForm);
  //       });
  //     }
  //   });
  // }
  loadEmployee(id: number) {
    this.employeeService.getEmployeeById(id).subscribe((emp) => {
      // Convert date strings to "YYYY-MM-DD" format
      emp.dateOfBirth = emp.dateOfBirth?.substring(0, 10);
      emp.dateOfJoining = emp.dateOfJoining?.substring(0, 10);
  
      // Set main employee form data
      this.employeeForm.patchValue(emp);
  
      // Clear any previous bank accounts (in case of re-opening form)
      this.bankAccounts.clear();
  
      // Set bank accounts if available
      if (emp.bankAccounts && emp.bankAccounts.length > 0) {
        emp.bankAccounts.forEach((acc) => {
          const accForm = this.createBankAccount();
          accForm.patchValue(acc);
          this.bankAccounts.push(accForm);
        });
      }
    });
  }
  
  onSubmit() {
    if (!this.employeeForm.valid) {
     this.toastr.error('Please fill all required fields.');
     
      return;
    }

    const bankAccounts = this.bankAccounts.value;
    const primaryCount = bankAccounts.filter((acc: any) => acc.isPrimary).length;
    if (primaryCount !== 1) {
      this.toastr.error('Please select exactly one primary bank account.');
      return;
    }

    const formValue: Employee = this.employeeForm.value;


    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, formValue).subscribe(() => {
        this.toastr.success('Employee updated successfully');
        this.router.navigate(['/employee']);
        
      });
    } else {
      this.employeeService.createEmployee(formValue).subscribe(() => {
        this.toastr.success('Employee created successfully');
        this.router.navigate(['/employee']);
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/employee']);  }
  
    religions = [
      { label: 'Islam', value: 'Islam' },
      { label: 'Christianity', value: 'Christianity' },
      { label: 'Hinduism', value: 'Hinduism' },
      { label: 'Sikhism', value: 'Sikhism' },
      { label: 'Other', value: 'Other' }
    ];

    maritalStatuses = [
      { label: 'Single', value: 'Single' },
      { label: 'Married', value: 'Married' },
      { label: 'Divorced', value: 'Divorced' },
      { label: 'Widowed', value: 'Widowed' }
    ];
}
