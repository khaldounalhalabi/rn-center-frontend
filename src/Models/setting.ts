import { Media } from "@/Models/Media";

export interface Setting {
  id: number;
  label: string;
  value: string;
  image?: File | any | Media[];
}
