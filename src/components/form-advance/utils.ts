import { Dayjs } from "dayjs";

const removeUndefinedValues = <T extends object = object>(obj: T): Partial<T> => {
  const result: Partial<T> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key as keyof T] = value;
    }
  });

  return result;
};

const getObjectValuesDiff = (obj1: object, obj2: object): Record<string, unknown> => {
  const diff: Record<string, unknown> = {};
  const keys = Object.keys(obj2);

  keys.forEach((key) => {
    if (key === '_id' || key === 'id') {
      diff[key] = obj2[key as keyof typeof obj2];
      return;
    }

    const val1 = obj1[key as keyof typeof obj1];
    const val2 = obj2[key as keyof typeof obj2];

    if (val1 !== val2) {
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (JSON.stringify(val1) !== JSON.stringify(val2)) {
          diff[key] = val2;
        }
      } else if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
        // Check if values are dayjs objects
        if (val1?.['$d'] && val2?.['$d']) {
          if (!(val1 as Dayjs).isSame(val2 as Dayjs, 'day')) {
            diff[key] = val2;
          }
        } else if (val1?.['province'] && val2?.['province']) {
          const addressFields = ['province', 'district', 'ward', 'detail'];
          const hasAddressChange = addressFields.some(field =>
            val1[field as keyof typeof val1] !== val2[field as keyof typeof val2]
          );
          if (hasAddressChange) {
            diff[key] = val2;
          }
        } else {
          const nestedDiff = getObjectValuesDiff(val1, val2);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        }
      } else {
        diff[key] = val2;
        console.log(key, val2);
      }
    }
  });

  return diff;
};

export { getObjectValuesDiff, removeUndefinedValues };