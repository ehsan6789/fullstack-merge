import { BankAccount } from './bank-account.model';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  address: string;
  phoneNo: string;
  emergencyNo: string;
  education: string;
  cnic: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  experience: string;
  religion: string;
  maritalStatus: string;
  reference: string;
  dateOfJoining: string;
//   departmentId: number;
  departmentName: string;     // ✅ NEW
  status: string; 
  bankAccounts: BankAccount[];
}
