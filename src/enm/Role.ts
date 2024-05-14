export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer",
  DOCTOR = "doctor",
}

const Roles = (): string[] => {
  return Object.values(Role);
};

export default Roles;
