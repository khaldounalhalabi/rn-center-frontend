import { Clinic } from "./Clinic";
import { ServiceCategory } from "@/Models/ServiceCategory";
import {Media} from "@/Models/Media";

export interface Service {
  id: number;
  name: string;
  approximate_duration: number;
  service_category_id: number;
  price: number;
  status: string;
  description: string;
  clinic_id: number;
  serviceCategory: ServiceCategory;
  clinic: Clinic;
  icon?:Media[]
}