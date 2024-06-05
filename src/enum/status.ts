export enum Status {
  ACTIVE = "active",
  INACTIVE = "in-active",
}

const StatusArray = (): string[] => {
  return Object.values(Status);
};

export default StatusArray;