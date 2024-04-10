import { Translatable } from "@/Models/Translatable";

export function getNestedPropertyValue(object: any, path: string): any {
  const properties = path.split("."); // Split the path string by dot to get individual property names
  let value = object;
  for (const property of properties) {
    if (value?.hasOwnProperty(property)) {
      value = value[`${property}`]; // Access the property dynamically
    } else {
      return undefined; // Property doesn't exist
    }
  }
  return value;
}

export const sanitizeString = (str: string): string => {
  return str
    .replace("_ids", " ")
    .replace("_id", " ")
    .replace(".", " ")
    .replace("_", " ")
    .replace(" id ", " ")
    .replace(" ids ", " ");
};

export function translate(
  val: string | undefined | null,
  object?: boolean,
): string;

export function translate(
  val: string | undefined | null,
  object: true,
): Translatable;

export function translate(
  val: string | undefined | null,
  object = false,
): string | Translatable {
  try {
    if (!val && object) {
      return {
        en: "",
        ar: "",
      };
    } else if (!val && !object) {
      return "";
    }
    const tr = JSON.parse(val ?? "{}");
    if (object) {
      return tr;
    }
    const locale = "en";
    if (locale == "en") {
      return tr.en ?? "";
    } else return tr.ar ?? "";
  } catch (e) {
    if (object) {
      return {
        en: val ?? "",
        ar: val ?? "",
      };
    }
    return val ?? "";
  }
}
