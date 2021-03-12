import { isValidHex, isValidRGB } from './regex.ts';

export function isValidStringColor(input: string) {
  if (isValidHex(input) || isValidRGB(input)) {
    return input;
  } else {
    console.warn('[S.Color] Invalid String Input:', input);
    return null;
  }
}
