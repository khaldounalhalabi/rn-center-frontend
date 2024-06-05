export enum City {
  BGDAD = "بغداد",
  NENWA = "نينوى",
  BSRA = "البصرة",
  SALAH = "صلاح الدين",
  DMOK = "دهوك",
  ARBEL = "اربيل",
  SLEMAN = "السليمانية",
  DBALE = "ديالى",
  WASET = "واسط",
  MESAN = "ميسان",
  DEKAR = "ذي قار",
  MOTHNA = "المثنى",
  BABL = "بابل",
  KRBLA = "كربلاء",
  NAGAF = "النجف",
  ANBAR = "الانبار",
  KADS = "القادسية",
  KRKOK = "كركوك",
}

const CityArray = (): string[] => {
  return Object.values(City);
};

export default CityArray;