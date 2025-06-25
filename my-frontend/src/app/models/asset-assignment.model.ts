export interface AssetAssignment {
  id: number;
  assetId: number;
  assignedToUserId: string;
  assetName?: string;
  assignedDate: string;
  returnDate?: string;
}
