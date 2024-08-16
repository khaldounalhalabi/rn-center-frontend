export enum Blood {
  A = "A+",
  A_ = "A-",
  B = "B+",

  B_ = "B-",

  AB = "AB+",

  AB_ = "AB-",

  O = "O+",

  O_ = "O-",
}

const BloodArray = (): string[] => {
  return Object.values(Blood);
};

export default BloodArray;
