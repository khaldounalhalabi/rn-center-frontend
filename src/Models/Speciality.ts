import SpecialityForm from "@/components/admin/speciality/SpecialityForm";

export interface Speciality {
  id: number;
  name: string;

}

export interface AddSpeciality {
  id?:number,
  name : string,
  description:string,
  tags:string
}