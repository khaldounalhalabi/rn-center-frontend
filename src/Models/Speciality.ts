export interface Speciality {
  id: number;
  name: string;
}

export interface AddSpeciality {
  id?: number;
  name: string;
  description: string;
  tags: string;
}
