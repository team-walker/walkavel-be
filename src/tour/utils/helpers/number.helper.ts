/**
 * Safely parses a string into an integer.
 * Returns null if the input is empty, null, undefined, or not a valid number.
 * @param val String value to parse
 * @returns number | null
 */
export function parseSafeInt(val: string | number | null | undefined): number | null {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  const num = typeof val === 'number' ? val : parseInt(val, 10);

  if (isNaN(num)) {
    return null;
  }

  return num;
}

/**
 * Safely parses a string into a float.
 * Returns null if the input is empty, null, undefined, or not a valid number.
 * @param val String value to parse
 * @returns number | null
 */
export function parseSafeFloat(val: string | number | null | undefined): number | null {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  const num = typeof val === 'number' ? val : parseFloat(val);

  if (isNaN(num)) {
    return null;
  }

  return num;
}
