export enum HospitalStatus {
  ACTIVE = "active",
  INACTIVE = "in-active",
}

const AllHospitalStatus = (): string[] => {
  return Object.values(HospitalStatus);
};

export default AllHospitalStatus;
