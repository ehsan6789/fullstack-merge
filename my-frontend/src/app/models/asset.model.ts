export interface Asset {
  id: number;
  name: string;
  description: string;
  serialNumber: string;
  categoryId: number;
  categoryName: number;
  // status: string;
  isActive: boolean;
   cost?: number;
  status: number;
}