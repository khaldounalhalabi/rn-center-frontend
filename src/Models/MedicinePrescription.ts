import MedicinePrescriptionStatusEnum from "@/enum/MedicinePrescriptionStatusEnum";
import { Medicine } from "@/Models/Medicine";

interface MedicinePrescription {
  id: number;
  prescription_id: number;
  medicine_id: number;
  dosage?: string;
  dose_interval?: string;
  comment?: string;
  status?: MedicinePrescriptionStatusEnum;
  medicine?: Medicine;
}

export default MedicinePrescription;
