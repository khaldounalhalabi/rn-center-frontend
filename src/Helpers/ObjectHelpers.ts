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