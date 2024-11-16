import { Media } from "@/Models/Media";

export interface Speciality {
  id: number;
  name: string;
  description: string;
  tags: string;
  image: Media[];
  clinics_count?: number;
}
