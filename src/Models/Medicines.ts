import MedicineStatusEnum from "@/enum/MedicineStatusEnum";

export interface Medicine {
  id?: number;
  name: string;
  description?: string;
  status: MedicineStatusEnum;
  barcode?: string;
  quantity?: number;
}
