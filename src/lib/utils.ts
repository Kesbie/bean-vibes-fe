import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const convertMapToArray = <T extends { title: string }, K extends { label: string, value: string }>(
  map: Map<string, T>,
  callback?: (key: string, value: T) => K
): K[] => {
  return Array.from(map.entries()).map(([key, value]) =>
    callback ? callback(key, value) : {
      label: value.title,
      value: key
    } as K
  );
};

const removeUndefinedValues = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result: Partial<T> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key as keyof T] = value;
    }
  });

  return result;
};


export { cn, convertMapToArray, removeUndefinedValues };