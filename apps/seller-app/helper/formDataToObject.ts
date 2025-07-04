// FormData converter utility - Updated to handle multiple form types
export function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    // Handle file fields (images, profilePicture, etc.)
    if (value instanceof File) {
      obj[key] = value;
    }
    // Handle numeric fields
    else if (
      key === "price" ||
      key === "compareAt" ||
      key === "productSize" ||
      key === "productQuantity"
    ) {
      obj[key] = value ? Number(value) : undefined;
    }
    // Handle boolean fields
    else if (key === "featured") {
      obj[key] = value === "true";
    }
    // Handle array fields (specialities)
    else if (key === "specialities") {
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key].push(value);
    }
    // Handle array format like specialities[0], specialities[1]
    else if (key.startsWith("specialities[") && key.endsWith("]")) {
      if (!obj.specialities) {
        obj.specialities = [];
      }
      obj.specialities.push(value);
    }
    // Handle regular string fields
    else {
      obj[key] = value || undefined;
    }
  }

  return obj;
}
