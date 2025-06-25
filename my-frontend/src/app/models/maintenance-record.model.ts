export interface MaintenanceRecord {
  id: number;
  assetId: number;
  assetName: string; 
  maintenanceDate: string;
  description: string;
  cost: number;
  technicianName: string;
}
